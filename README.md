# wolf-store
webpack,react,jsx,less,nodejs,koa,mongodb

# webpack configuration

## 开发环境
1.devtool：'cheap-module-eval-source-map'
2.devServer：配置本地开发服务
3.watchOptions：配置本地服务器监听的一些参数
4.optimization下的usedExports属性设置为true,启用代码过滤
5.plugin: 
    HotModuleReplacementPlugin



## 生产环境
1.plugin:
    WorkboxWebpackPlugin: pwd离线访问
    ParallelUglifyPlugin：加速webpack打包，清除一些无用的代码
    happypack：针对js/ts等脚本文件进行优化多进程打包，提高打包速度