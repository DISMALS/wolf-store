const path = require('path');
// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');

// const argvParams = process.argv[2];
// const weboackConfig = require('./webpack-dev.config')();

// WebpackDevServer.addDevServerEntrypoints(weboackConfig, options);

// const compiler = webpack(weboackConfig);
// const server = new WebpackDevServer(compiler, options);

// server.listen(6900, '127.0.0.1', () => {
//     console.log('listen post 127.0.0.1:6900');
// });

module.exports = {
    hot: true,
    open: true,
    port: 6900,
    compress: true, // 服务器返回浏览器的时候是否启动gzip压缩
    watchContentBase: true,
    contentBase: path.resolve(__dirname, '../dist'), // 静态文件根目录
    headers: {  // set heasers for response
        'Expires': 0,
        'Etag': 0,
        'Cache-Control': 'max-age=0',
    },
    historyApiFallback: false,
    stats: {
        cached: false,
        colors: true
    }
};
