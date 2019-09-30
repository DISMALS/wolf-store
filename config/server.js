const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const weboackConfig = require('./webpack-dev.config');

const options = {
    hot: true,
    open: true,
    port: 6900,
    compress: true,
    // lazy: true,
    watchContentBase: true,
    contentBase: path.resolve(__dirname, '../dist'),
    // headers: {  // set heasers for response

    // },
    // // https: true,
    // historyApiFallback: false,
    // states: {
    //     cached: false,
    //     colors: true
    // }
};

WebpackDevServer.addDevServerEntrypoints(weboackConfig, options);

const compiler = webpack(weboackConfig);
const server = new WebpackDevServer(compiler, options);

server.listen(6900, '127.0.0.1', () => {
    console.log('listen post 127.0.0.1:6900');
});