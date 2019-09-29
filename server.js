const express = require('express');
const webpack = require('webpack');
const WebpackDevMiddleWare = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack-dev.config');
const compiler = webpack(config);


app.use(WebpackDevMiddleWare(compiler, {
    publicPath: config.output.publicPath
}));

app.use(WebpackHotMiddleware(compiler));


app.listen('8080', () => {
    console.log('app listen port is 8080');
});