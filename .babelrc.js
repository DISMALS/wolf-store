module.exports = {
    presets: [
        'minify',
        [
            '@babel/preset-env', 
            {
                useBuiltIns: 'usage',
                corejs: 3
            }
        ], [
            '@babel/preset-react',
            {
                development: process.env.BABEL_ENV === 'development',
            }
        ], [
            '@babel/preset-typescript',
            {
                isTSX: false,
                allExtensions: false
            }
        ]
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3
            }
        ],
        ['@babel/plugin-syntax-dynamic-import']
    ]
}