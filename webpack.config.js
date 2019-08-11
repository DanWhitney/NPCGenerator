var path = require('path');
var nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    target: "node",
    externals: [nodeExternals()],
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js'] //resolve all the modules other than index.ts
    },
    module: {
        rules: [
            {
                test: /\.graphgl/,
                use: 'raw-loader',
            },
            {
                use: 'ts-loader',
                test: /\.ts?$/,
            }
        ]
    },
    plugins: [new CopyPlugin([
        {from: './src/schema.graphql', to: ''},
        {from: '.env', to: ''},
        {from: 'package-build.json', to: 'package.json', toType: 'file'}
    ])

    ]
}