const  path = require('path');
const webpack = require('webpack');

const devServerOptions = require('./devServerConfig');

module.exports = (config) => {
    config = {
        ...config,
        output: {
            ...config.output,
            filename: path.join('script', '[hash:20]-[name].js?[hash:10]'),
            chunkFilename: path.join('script', '[hash:20]-[name].js?[hash:10]'),
        },
        devtool: 'inline-source-map',
        devServer: devServerOptions,
        watchOptions: {
            ignored: /node_modules/
        }
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    return config;
}