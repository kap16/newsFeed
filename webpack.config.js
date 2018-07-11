const path = require('path');
const webpack = require('webpack');
const globalConfig = require('./config.json');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

var OUTPUT_DIR = 'build';
var BUILD_DIR = path.join(__dirname, OUTPUT_DIR);
var APP_DIR = path.resolve(__dirname, 'client')
var ENTRY_DIR =  APP_DIR+ '/index.js'
var outputPath = process.env.build ? BUILD_DIR : path.join(__dirname, OUTPUT_DIR);

config = {
    //entry:["babel-polyfill", ENTRY_DIR],
    entry:[ENTRY_DIR],
    output: {
        path: outputPath,
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve:{ // looks for the files to bundle
        modules: ['node_modules','client'],
        extensions: ['.js'] // extensions webpack is gonna expect
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({template: 'client/index.html'}),
        new OptimizeCssAssetsPlugin(),
        new CleanWebpackPlugin([OUTPUT_DIR]),
        new CopyWebpackPlugin([
            {from:'client/img/',to:'img/'}
        ]),
        new webpack.DefinePlugin({ // needed for cross env to work
             VERSION: JSON.stringify(require("./package.json").version),
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'PORT': process.env.PORT
            }
        })
    ],
    module : {
        rules : [
            {
                test : /\.jsx?/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader', 'babel-loader']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            }, 
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpg|png)$/,
                use:[{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/', // used for copying
                            publicPath: 'img/', // used to update html to the correct path
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use:[{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ],
                exclude: path.resolve(__dirname, 'client/index.html')
            }
        ]
    }
};

// BUILD
if ((process.env.NODE_ENV === 'production' || process.env.PROD_ENV) || process.env.build) {
    config.plugins.push(
        new OptimizeCssAssetsPlugin(),
        new UglifyJSPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    )
}
if (process.env.NODE_ENV === 'development'){
    /*config.plugins.push(
        new webpack.NoEmitOnErrorsPlugin()
    )*/
    config.stats = {
        warnings: false
    };
    config.devServer = { 
        inline: true,
        contentBase: APP_DIR,
        compress: true,
        port: 3001,
        historyApiFallback: true,

        // dev warnings
        noInfo: true,
        quiet: false,
        overlay: {
            warnings: false,
            errors: false
        }
    }
}

module.exports = config;