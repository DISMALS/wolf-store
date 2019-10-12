const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
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
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW({ // PWD离线缓存策略
        cacheId: 'webpack-pwa', // 设置前缀
        skipWaiting: true, // 强制等待中的 Service Worker 被激活
        clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
        cleanupOutdatedCaches: true,  // 尝试删除老版本缓存
        importWorkboxFrom: 'local',
        swDest: path.resolve(__dirname, '../dist/service-wroker.js'), // 输出 Service worker 文件
        globPatterns: ['**/*.{html,js,jsx,ts,tsx,vue,css,png.jpg}'], // 匹配的文件
        globIgnores: ['service-wroker.js'], // 忽略的文件
        runtimeCaching: [
            // 配置路由请求缓存
            {
                urlPattern: /.*\.js/, // 匹配文件
                handler: 'networkFirst' // 网络优先
            }
        ]
    }));
    return config;
}