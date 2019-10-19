const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postCssPlugins = require('./postcss.plugins.js');

const webProd = require('./webpack-prod.config');
const webDev = require('./webpack-dev.config');

const VERSION = JSON.stringify(Date.now());
const NODE_ENV = process.env.NODE_ENV || 'development'; // 环境变量，production/development
const isProd = NODE_ENV === 'production';

function findModule (m) {
    if (m.issure) {
       return findModule(m.issure);
    }
    if (m.name) {
        return m.name;
    }
    return false;
}

module.exports = (...env) => {
    const config = {
        mode: NODE_ENV,
        entry: {
            polyfill: path.resolve(__dirname, '../src/polyfill.js'),
            main: path.resolve(__dirname, '../src/main.tsx'),

        },
        output: {
            filename: path.join('script', '[hash:20]-[name].js?[hash:10]'),
            chunkFilename: path.join('script', '[hash:20]-[name].js?[hash:10]'),
            path: path.resolve(__dirname, '../dist'),
            // publicPath: '../',
            libraryTarget: 'umd', // 全局资源变量定义类型
            auxiliaryComment: 'wolf wang. module comment' // 为输出的模块添加备注
        },
        optimization: {
            moduleIds: 'natural',
            nodeEnv: NODE_ENV,
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
                cacheGroups: {
                    vendors: {
                        // /[\\/]node_modules[\\/]/
                        test(module, chunks) {
                            return module.resource === undefined || (module.resource.includes('node_modules') && !module.resource.includes('polyfill'));
                        },
                        reuseExistingChunk: true,
                        // cacheGroupKey的值在这里是commons
                        name(module, chunks, cacheGroupKey) {
                            // const moduleDirNames = module.identifier().split('/');
                            // const moduleFileName = moduleDirNames[moduleDirNames.length - 1].split('.')[0]; // 被引用的module的文件名
                            // const allChunksName = chunks.map(chunk => chunk.name).join('-'); // 引用module的模块的名字集合
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
                    },
                    // styles: {
                    //     test(module, chunks) {
                    //         console.log(module.constructor.name);
                    //         console.log(module.issuer.name);
                    //         return module.constructor.name === 'cssModule' && findModule(module) === 'main';
                    //     },
                    //     name: 'styles',
                    //     test: /index.less/,
                    //     chunks: 'all',
                    //     minChunks: 1

                    // }
                }
            },
            runtimeChunk: {
                name: 'runtime'
            }
        },
        module:{
            rules: [
                { // css
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: !isProd,
                                reloadAll: true
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
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
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: !isProd,
                                reloadAll: true
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProd,
                                modules: false
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
                    exclude: /node_modules/,
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
                    exclude: /node_modules/,
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
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: isProd ? ['happypack/loader?id=thread_pool_js'] : ['babel-loader']
                }, { // ts/tsx
                    test: /\.tsx?$/,
                    use: ['ts-loader'],
                    exclude: /node_modules/
                }, { // html, 注意在处理index.html时，会和HtmlWebpackPlugin冲突，因此index.html改名为index.ejs
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: ['img:src', 'img:data-src', 'audio:src'],
                                minimize:true 
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../dist')]
            }),
            new webpack.DefinePlugin({
                VERSION,
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            new HtmlWebpackPlugin({
                templateParameters: {
                    title: 'WOLF STORE',
                    name: 'wangyong'
                }, // 模版参数配置
                filename: `index.html?${VERSION}`,
                template: path.resolve(__dirname, '../src/index.ejs'),
                meta: {
                    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
                },
                hash: true,
                cache: false,
                minify:true,
                xhtml: true
            }),
            new MiniCssExtractPlugin({
                filename: isProd ? './styels/[hash]-[name].css' : './styels/[hash]-[name].css',
                chunkFilename: isProd ? './styels/[hash]-[name]-chunk.css' : './styels/[name]-chunk.css',
                ignoreOrder: false
            })
        ],
        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.vue', '.jsx'],
            modules: [path.resolve(__dirname, '../src'), 'node_modules'],
            unsafeCache: false
        }
    }

    if (isProd) { // 生产环境
        return webProd(config);
    }

    return webDev(config); // 开发环境
}
