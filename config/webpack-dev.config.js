const  path = require('path');

const postCssPlugins = require('./postcss.plugins.js');


module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../dist') // 此目录是基于项目根目录来进行输出
    },
    module: {
        rules: [
            { // css
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident:'postcss',
                            plugins: postCssPlugins()
                        }
                    }
                ]
            }, { // less
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: postCssPlugins()
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                           sourceMap: true 
                        }
                    }
                ]
            }
        ]
    }
};