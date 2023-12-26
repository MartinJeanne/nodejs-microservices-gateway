const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const Keycloak = require('keycloak-connect');
const routes = require('./routes');

const app = express();
const port = 4000;

const realmPublicKey = process.env.REALM_KEY || 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxg94wsjJjm8Dql3Hbfz8OSopDp2cMA/yFXUmw4w9uqkGJ0aGYjv2Ai3nYgvNLL4ycI64Jup9L9mpfxLx89xZcmWl87V+iBkdbn1D8FD7bXvg5LQsMJevAAVjwkflIe6AH2i/stkBCXpu+FNnrErlB+jRRjUv41S97ZRA4MJGWhjV6gM8gSNbnyRxzYmgH2HxERhsIFj5SUpJCmkszYM1arYc9gDibOhRrMiT87LFn6f8DjeMMo3a2B9CpiJzHtVmSXx3RwvyfKkd9v89wz/eDDJOymEXXp188sCrdbGupjodoxc9xg7P+uDR1lio9+SIBm8uwgmdVQZ5stTz5/rBewIDAQAB';

const kcConfig = {
    clientId: 'client',
    bearerOnly: true,
    publicClient: true,
    authServerUrl: 'http://localhost:8080',
    realm: 'e-commerce',
    realmPublicKey,
};

const keycloak = new Keycloak({}, kcConfig);

app.use(keycloak.middleware());

app.get('/public', (req, res) => {
    res.json({ message: 'public' });
});

app.get('/secured', keycloak.protect('realm:admin'), (req, res) => {
    res.json({ message: 'secured' });
});

routes.forEach(route => {
    app.use(route.url, keycloak.protect('realm:admin'), function (req, res, next) {
        next();
    });
    app.use(route.url, createProxyMiddleware(route.proxyOptions));
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
