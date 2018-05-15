var webpack = require('webpack')
var path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin') //清除dist目录
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var PurifyCss= require('purifycss-webpack')
var glob = require('glob-all')

module.exports = {
    entry: {
        'app': './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: 'style-loader',
                    options: {
                        singleton: true,
                        transform: './css.transform.js'
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: true,
                        localIdentName: '[path][name]_[local]_[hash:base64:5]'
                    }
                }
            ]
        }, {
            test: /\.less$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: { //当不提取css的时候，用什么形式加载css
                    loader: 'style-loader',
                    options: {
                        singleton: true
                    }
                },
                use: [{ //如果提取出来，这些文件还要怎么处理
                        loader: 'css-loader',
                        options: {
                            // minimize: true,
                            modules: true,
                            localIdentName: '[path][name]_[local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss', //表面后面的插件给postcss用的
                            plugins: (loader) => [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            })
        },{
            test:/\.js$/,
            use:[
                {
                    loader:'babel-loader',
                    options:{
                        presets:['env'],
                        plugins:['lodash']
                    }
                }
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin('./dist'),
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            allChunks: false //默认false，如果为true，会把所有依赖的css都提取出来，如果为false，只有初始化的css加载（异步加载之外）
        }),

        new PurifyCss({
            paths:glob.sync([
                // path.join(__dirname,'./index.html')
            ])
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ]

}