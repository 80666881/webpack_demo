var webpack = require('webpack')
var path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin') //清除dist目录
module.exports = {
    entry: {
        'pageA': './src/pageA.js',
        'pageB':'./src/PageB.js',
        'vendor':['lodash']//第三方引用包
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath:'./dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            async:'async-common',
            minChunks:2,
            children:true,//子依赖同样生效，需要删除import指定名称
            name:'async'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names:['vendor','manifest'],//vendor 第三方引用,manifest 业务代码
            minChunks:Infinity//
        }),
        new CleanWebpackPlugin('./dist')
    ]

}