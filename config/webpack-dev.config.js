const  path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const postCssPlugins = require('./postcss.plugins.js');
const devServerOptions = require('./devServerConfig');
console.log(process.env.NODE_ENV);
module.exports = (...e) => {
    console.log(e);
    return {
        mode: 'production',
        entry: [
            path.resolve(__dirname, '../src/polyfill.js'),
            path.resolve(__dirname, '../src/main.js')
        ],
        output: {
            filename: path.join('component', '[hash:20]-[name].js?[hash:10]'),
            chunkFilename: path.join('component', '[hash:20]-[name].js?[hash:10]'),
            path: path.resolve(__dirname, '../dist'), // 此目录是基于项目根目录来进行输出
            publicPath: '/', // 请求资源的地址
            libraryTarget: 'umd', // 全局资源变量定义类型
            auxiliaryComment: 'module comment' // 为输出的模块添加备注
        },
        devtool: 'inline-source-map',
        devServer: devServerOptions,
        optimization: {
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
            },
            runtimeChunk: {
                name: 'runtime'
            }
        },
        module: {
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
                }, { // js/jsx
                    test: /\.(js|jsx|ts|tsx|vue)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                }, { // vue
                    test: /\.vue$/,
                    use: ['vue-loader']
                }, { // ts/tsx
                    test: /\.tsx?$/,
                    use: ['ts-loader']
                }
            ]
        },
        plugins: [
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV':
            // }),
            new VueLoaderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                templateParameters: {
                    title: 'WOLF STORE',
                    name: 'wangyong'
                }, // 模版参数配置
                path: '../dist/index.html?[hash:20]',
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
            extensions: ['.js', '.ts', '.tsx', '.vue', 'jsx', '.html']
        }
    }

};