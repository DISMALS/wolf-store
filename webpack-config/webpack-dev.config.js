const  path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve('./', 'dist') // 此目录是基于项目根目录来进行输出
    }
};