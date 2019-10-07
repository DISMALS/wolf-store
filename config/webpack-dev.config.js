const  path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const postCssPlugins = require('./postcss.plugins.js');
const devServerOptions = require('./devServerConfig');
module.exports = (...e) => {
    return {
        output: {
            filename: path.join('component', '[hash:20]-[name].js?[hash:10]'),
            chunkFilename: path.join('component', '[hash:20]-[name].js?[hash:10]'),
            publicPath: '/', // 请求资源的地址
        },
        devtool: 'inline-source-map',
        devServer: devServerOptions,
        optimization: {
            removeEmptyChunks: false,
            splitChunks:{
                chunks: 'all',
                maxInitialRequests: 3,
                maxAsyncRequests: 5,
                automaticNameDelimiter: '-', // 生成模块文件名称的分隔符
                automaticNameMaxLength: 109, // 生成名称的长度
                minChunks: 2, // 最少几个模块共享一个模块
                minSize: 30000, // 模块大小超过这个值则进行分割
                maxSize:0,
                cacheGroups: {
                    vendors: {
                        // /[\\/]node_modules[\\/]/
                        test(module, chunks) {
                            // console.log(module.resource);
                            return module.resource === undefined || (module.resource.includes('node_modules') && !module.resource.includes('polyfill'));
                        },
                        reuseExistingChunk: true,
                        // cacheGroupKey的值在这里是commons
                        name(module, chunks, cacheGroupKey) {
                            const moduleDirNames = module.identifier().split('/');
                            const moduleFileName = moduleDirNames[moduleDirNames.length - 1].split('.')[0]; // 被引用的module的文件名
                            const allChunksName = chunks.map(chunk => chunk.name).join('-'); // 引用module的模块的名字集合
                            return `${cacheGroupKey}`;
                        },
                        chunks: 'all',
                        priority: -10,
                        minChunks: 1, // 最少几个模块共享一个模块
                    },
                    polyfill: {
                        test(module, chunks) {
                            return module.resource && module.resource.includes('polyfill');
                        },
                        reuseExistingChunk: true,
                        name: 'polyfill',
                        chunks: 'all',
                        priority: -5,
                        minChunks: 1,
                        minSize: 10000
                    }
                }
            }
        },
        plugins: [
            // new VueLoaderPlugin(), // vue
            new webpack.HotModuleReplacementPlugin(),
        ],
        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.vue', 'jsx']
        }
    }

};