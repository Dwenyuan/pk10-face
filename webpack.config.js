var path = require('path')
const webpack = require('webpack') //加载webpack模块
module.exports = {
    // devtool: '#eval-source-map',
    // devtool: '#inline-source-map',
    entry: {
        app: './src/main.js',
        login: './src/login/login.js',
        manager: './src/manager/manager.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: 'build/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        preLoaders: [{
            test: /\.vue$/,
            loader: 'eslint',
            exclude: /node_modules/
        }, {
                test: /\.js$/,
                loader: 'eslint',
                exclude: /node_modules/
            }],
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.html$/,
                loader: 'vue-html'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url?limit=3000'
            }]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
}