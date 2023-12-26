const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const Keycloak = require('keycloak-connect');
const routes = require('./routes');

const app = express();
const port = 4000;

const keycloak = new Keycloak({});

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
