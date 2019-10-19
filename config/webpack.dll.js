const path = require('path');
const webpack = require('webpack');
const packageJson = require('../package.json');

/**
 * 通过package.json文件获取以来的库
 *
 */
function findThirdPatyLibrary() {
    const dependencies = {...packageJson.dependencies};
    const keys = [];
    for (let key in dependencies) {
        keys.push(key);
    }
    console.log(keys);
    return keys;
}

module.exports = {
    mode: 'development',
    entry:{
        'manifest_dll': ['lodash', 'react', 'react-dom', 'react-router', 'react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, '../src/assets/static/'),
        filename: 'manifest_dll.js'
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'manifest_dll',
            path: path.resolve(__dirname, '../src/manifest.json')
        })
    ]
};