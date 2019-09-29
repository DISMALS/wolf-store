const  path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const postCssPlugins = require('./config/postcss.plugins.js');


module.exports = {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client',
        path.resolve(__dirname, './src/main.js')
    ],
    output: {
        filename:'[name].bundle.js',
        path: path.resolve(__dirname, './dist'), // 此目录是基于项目根目录来进行输出
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        open: true,
        contentBase: path.resolve(__dirname, './dist')
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
                            outputPath: './assets/fonts/',
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
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            templateParameters: {
                title: 'WOLF STORE',
                name: 'wangyong'
            }, // 模版参数配置
            template: path.resolve(__dirname, './src/index.html'),
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            hash: true,
            cache: false,
            minify:true,
            xhtml: true
        })
    ]
};