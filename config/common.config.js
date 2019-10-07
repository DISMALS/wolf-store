const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postCssPlugins = require('./postcss.plugins.js');


const VERSION = JSON.stringify(Date.now());
const NODE_ENV = process.env.NODE_ENV || 'development'; // 环境变量，production/development
const isProd = NODE_ENV === 'production';

const publicFilePath = path.resolve(__dirname, '../src/environment/');
console.log(NODE_ENV);

module.exports = (...env) => {
    const publicPath = require(`${publicFilePath}/environment.${env.environment || 'dev'}`); // 获取输出文件的公共地址
    console.log(env, NODE_ENV, publicPath);
    const config = {
        mode: NODE_ENV,
        entry: [
            path.resolve(__dirname, '../src/polyfill.js'),
            path.resolve(__dirname, '../src/main.js')
        ],
        output: {
            filename: path.join('script', '[hash:20]-[name].js?[hash:10]'),
            chunkFilename: path.join('script', '[hash:20]-[name].js?[hash:10]'),
            path: path.resolve(__dirname, '../dist'),
            publicPath: publicPath.serverUrl,
            libraryTarget: 'umd', // 全局资源变量定义类型
            auxiliaryComment: 'wolf wang. module comment' // 为输出的模块添加备注
        },
        optimization: {
            usedExports: true,
            moduleIds: 'natural',
            nodeEnv: NODE_ENV,
            sideEffects: true,
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: 3,
                maxAsyncRequests: 5,
                automaticNameDelimiter: '-', // 生成模块文件名称的分隔符
                automaticNameMaxLength: 109, // 生成名称的长度
                minChunks: 2, // 最少几个模块共享一个模块
                minSize: 30000, // 模块大小超过这个值则进行分割
                maxSize:0,
                name: true,
            },
            runtimeChunk: {
                name: 'runtime'
            }
        },
        module:{
            rules: [
                { // css
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: !isProd
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
                                sourceMap: !isProd,
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
                               sourceMap: !isProd 
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
                                limit: 10240, // 图片超过此大小则生成图片文件，否则使用编码嵌入代码中
                                qulity: 80, // 图片质量
                                outputPath: './assets/images/', // 输出路径
                                name(file){ // 文件名
                                    return isProd ? '[contenthash:20]-[name].[ext]' : '[hash:10]-[name].[ext]';
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
                                    return isProd ? '[contenthash:20]-[name].[ext]' : '[hash:10]-[name].[ext]';
                                }
                            }
                        }
                    ]
                }, { // js/jsx
                    test: /\.(js|jsx|ts|tsx|vue)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                }, { // vue
                    test: /\.vue$/,
                    use: ['vue-loader'],
                    exclude: /node_modules/
                }, { // ts/tsx
                    test: /\.tsx?$/,
                    use: ['ts-loader'],
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                VERSION,
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            // new VueLoaderPlugin(), // vue
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                templateParameters: {
                    title: 'WOLF STORE',
                    name: 'wangyong'
                }, // 模版参数配置
                filename: `index.html?${VERSION}`,
                template: path.resolve(__dirname, '../src/index.html'),
                meta: {
                    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
                },
                hash: true,
                cache: false,
                minify:true,
                xhtml: true
            })
        ],
        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.vue', 'jsx']
        }
    }



    return config;
}
