const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './app/src/index.js',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|ico)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                  },
                ],
            },
            { 
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
      },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
      },
    plugins: [
        new CopyPlugin({
          patterns: [
            { from: 'app/static/', to: 'static/' }
          ],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './app/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port: 5000,
        host: '0.0.0.0',
        allowedHosts: 'all',
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}