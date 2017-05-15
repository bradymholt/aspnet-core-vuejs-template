var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var config = {
    module: {
        rules: [
            { test: /\.ts(x?)$/, loaders: ['ts-loader'] },
            { test: /\.styl$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!stylus-loader' }) },
            { test: /\.css/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) }
        ]
    },
    devtool: '',
    externals: {
        vue: 'Vue',
        'vue-router': 'Router'
    },
    plugins: [
        new HtmlWebpackPlugin({
            release: true,
            template: path.join(__dirname, 'index.template.html'),
            useCdn: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("styles.css")

    ]
};
