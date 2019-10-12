
module.exports = function () {
    return (loader) => ([
        require('postcss-preset-env')({
            stage: 0,
            features: {
                'nesting-rules': true
            },
            browsers: [
                "ie >= 8",
                "ff >= 30",
                "chrome >= 34",
                "safari >= 7",
                "opera >= 23"
            ],
            autoprefixer: {
                grid: true,
                
            }
        }),
        require('postcss-import')(),
        require('postcss-assets')({
            cachebuster: true, // 打破缓存
            cache: true // 缓存
        }),
        require('cssnano')(), // 压缩css样式
    ])
};