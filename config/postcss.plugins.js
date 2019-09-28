
module.exports = function () {
    return (loader) => ([
        require('postcss-preset-env')({
            autoprefixer: {
                grid: true
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