var webpack = require('webpack')
var path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin') //清除dist目录
module.exports = {
    entry: {
       'app':'./src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath:'./dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                        loader:'style-loader',
                        options:{
                            insertInto:'#app',
                            singleton:true,
                            transform:'./css.transform.js'
                        }
                    },
                    {
                        loader:'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
     
        new CleanWebpackPlugin('./dist')
    ]

}