const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const routes = require('./routes');

const app = express();
const port = 8080;

routes.forEach(route => {
    app.use(route.source, createProxyMiddleware(route.proxy));
}),

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
