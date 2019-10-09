const path = require('path');
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
            usedExports: true, // tree shaking
            sideEffects: false, // tree shaking
            minimize: true,
            removeEmptyChunks: true,
            removeAvailableModules: true
        }
    };
    return config;
}