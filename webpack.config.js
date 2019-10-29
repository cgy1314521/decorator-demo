const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const mocker = require('webpack-api-mocker');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js'
    },
    resolve: {
        extensions: [ '.js', '.ts', '.tsx']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [ 'babel-loader' ]
        }, {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [ 'ts-loader' ]
        },{
            test: /\.less$/,
            use: [ 'style-loader', 'css-loader', 'less-loader' ]
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        port: 7000,
        open: true,
        before(app) {
            mocker(app, path.resolve(__dirname, 'src/mock/index.js'))
        }
    }
}