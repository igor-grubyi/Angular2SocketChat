const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

// plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;
const { CheckerPlugin } = require('awesome-typescript-loader')
//const ProvidePlugin = webpack.ProvidePlugin;

module.exports = {
    target: 'web',
    cache: true,
    

    module: {
        // noParse: ['ws'],
        loaders: [
            {
                test: /\.ts$/,
                exclude: [path.resolve(__dirname, '../node_modules')],
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, '../src/app')],
                loader: 'raw-loader!postcss-loader!sass-loader'
            },
            {
                test: /\.scss$/,
                exclude: [path.resolve(__dirname, '../src/app')],
                include: [path.resolve(__dirname, '../src/styles')],
                loader: ExtractTextPlugin.extract('raw-loader!postcss-loader!sass-loader')
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                loader:'url-loader?limit=1024&name=images/[name].[ext]'
            },
        ]
    },

    stats: {
        cached: true,
        cachedAssets: true,
        chunks: true,
        chunkModules: false,
        colors: true,
        hash: false,
        reasons: false,
        timings: true,
        version: false
    },

    entry: {
        'assets/js/main.js': './src/main',
        'assets/js/vendor.js': './src/vendor',
        'assets/js/polyfills.js': './src/polyfills'
    },

    externals: ['ws'],
    plugins: [
        new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
         options: {
           sassLoader: {
                outputStyle: 'compressed',
                precision: 10,
                sourceComments: false
            },
            postcss: [
                autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
            ],
         },
         debug: false,
       }),
        new CopyWebpackPlugin([
            { 
                context: path.resolve(__dirname, '../src/assets/images'),
                from: '**/*',
                to: 'assets/images/'
            }
        ]),
        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new ExtractTextPlugin('assets/css/main.css'),
        new OccurrenceOrderPlugin(),
        // new ProvidePlugin({
        //     io: 'socket.io-client'
        // }),
        new CommonsChunkPlugin({
            name: [
                'assets/js/main.js',
                'assets/js/vendor.js',
                'assets/js/polyfills.js'
            ]
        }),
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: 'index.html',
            hash: true,
            inject: 'body',
            template: './src/index.html'
        })
    ],

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [path.resolve('../src'), "node_modules"]
    },

    output: {
        filename: '[name]',
        path: path.resolve(__dirname, '../target'),
        publicPath: '/'
    },

    node: {
        'child_process': 'empty',
        clearImmediate: false,
        crypto: 'empty',
        fs: 'empty',
        module: false,
        net: 'empty',
        setImmediate: false,
        tls: 'empty',
        util: true
    }
};
