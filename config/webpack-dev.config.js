const  path = require('path');

const postCssPlugins = require('./postcss.plugins.js');


module.exports = {
    mode: 'development',
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
            }, { // files
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: 'file-loader', // 引入file-loader
                            limit: 1024, // 图片超过此大小则生成图片文件，否则使用编码嵌入代码中
                            qulity: 80, // 图片质量
                            outputPath: './assets/images/', // 输出路径
                            name(file){ // 文件名
                                if (process.env.NODE_ENV === 'production') {
                                    return '[contenthsah:20]-[name].[ext]';
                                }
                                return '[hash:10]-[name].[ext]';
                            }
                        }
                    }
                ]
            }, { // fonts 
                test: /\.(ttf|eot|otf|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outpurPath: './assets/fonts/',
                            name(file) {
                                if (process.env.NODE_ENV === 'production') {
                                    return '[contenthash:20]-[name].[ext]';
                                }
                                return '[hash:10]-[name].[ext]';
                            }
                        }
                    }
                ]
            }
        ]
    }
};