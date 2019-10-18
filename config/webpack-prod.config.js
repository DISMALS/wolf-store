const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const HappyPackPlugin = require('./happypack-config');
module.exports = (config) => {
    config = {
        ...config,
        output: {
            ...config.output,
            filename: path.join('script', '[contenthash:20]-[name].js?[contenthash:10]'),
            chunkFilename: path.join('script', '[contenthash:20]-[name].js?[contenthash:10]'),
        },
        optimization: {
            ...config.optimization,
            minimize: true,
            removeEmptyChunks: true,
            removeAvailableModules: true
        }
    };
    config.plugins.push(
        new WorkboxWebpackPlugin.GenerateSW({ // PWD离线缓存策略
            cacheId: 'webpack-pwa', // 设置前缀
            skipWaiting: true, // 强制等待中的 Service Worker 被激活
            clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
            cleanupOutdatedCaches: true,  // 尝试删除老版本缓存
            importWorkboxFrom: 'local',
            swDest: path.resolve(__dirname, '../dist/service-wroker.js'), // 输出 Service worker 文件
            runtimeCaching: [
                // 配置路由请求缓存
                {
                    urlPattern: /.*\.js/, // 匹配文件
                    handler: 'NetworkFirst' // 网络优先
                }
            ]
        }),
        new ParallelUglifyPlugin({ // 加速webpack打包，js文件优化
            test: /\.(js|jsx|ts|tsx|vue)$/,
            include: [path.resolve(__dirname, '../src')],
            exclude: ['node_modules'],
            uglifyJS: {
                output: {
                    // beautify: false,
                },
                compress: {
                    drop_console: true,
                    warnings: false
                }
            }
        }),
        HappyPackPlugin('thread_pool_js', [{ // 针对js文件执行多进程打包
            loader: 'babel-loader',
            options: {
                cacheDirectory: true
            }
        }]),
        HappyPackPlugin('thread_pool_ts', [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }, { // 针对ts文件执行多进程打包
                loader: 'ts-loader'
            }
        ])
    );
    return config;
}