var webpack = require('webpack')
var path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin') //清除dist目录
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

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
                        singleton: true,
                        transform: './css.transform.js'
                    }
                },
                use: [{ //如果提取出来，这些文件还要怎么处理
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: '[path][name]_[local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin('./dist'),
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            allChunks:false//默认false如果为true，会把所有依赖的css都提取出来，如果为false，只有初始化的css加载（异步加载之外）
        })
    ]

}