## tutorial for webpack 3.x

please checkout the branch to refer different feature.

> BASE ON webpack@3.4.1

### 代码分割和懒加载

 - webpack methods

     - require.ensure([],callback)
         - []:dependencies:依赖，ensure的时候不会执行，只会加载代码
         - callback：callback中require依赖时，依赖才会执行
         - errorCallback
         - chunkName

     - require.include([])
         - 引入模块。不执行
           当两个子模块都依赖一个第三方依赖，可以在父模块导入。

 - es 2015 Loader

     - System.import() -> import()
     - import() -> Promise
     - import().then()
    
     - 可以通过注释的方式进行配置

    ```js
        import(
            /* webpackChunkName: async-chunk-name */
            /* webpackMode: lazy */
            modulename
        )
    ```

  - 代码分割类别

     - 分离业务代码 和 第三方依赖
     - 分离业务代码 和 业务公共代码 和 第三方依赖
     - 分离首次加载 和 访问后加载的代码

### 代码分割和懒加载2

>目的：异步加载，提取公共模块moduleA

在父模块pageA不使用include，因为include会把公共模块moduleA打包进去

```js
//pageA
require.include('./moduleA.js')
```

<font color="red">目前打包公共moduleA有问题，待处理</font>


### CSS

 - 引入css===>loader

    - style-loader
         - 在html创建一个style标签，里面就是css内容

         - options
            - insertAt （插入位置）
            - insertInto （插入到dom）
            - singleton （是否只使用一个style 标签）
            - transform （转化，打包时不运行，在浏览器环境下运行<把style标签插入html>，插入页面前）
            
            使用示例


            ```js
            //webpack.config.js
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

            //css.transform.js
            module.exports = function(css){
                //可以在这里改变css，比如不同客户端的不同样式
                console.log(css),
                console.log(window.innerWidth)
                if(window.innerWidth >=768 ){
                    return css.replace('gray','yellow')
                }else{
                    return css.replace('gray','orange')
                }
            }
            ```

    ---

    - style-loader/url

        - 在页面生成link标签
        
        ```js
        //不常用，因为引入多个css会产生多个link标签
            {
                loader:'style-loader/url'
            },
            {
                loader:'file-loader'
            }
        ```

    ---

    - style-loader/useable

        - 控制某些css是否插入

          使用示例

          ```js

            //webpack.config.js
             use:[
                    {
                        loader:'style-loader/useable'
                    },
                    {
                        loader:'css-loader'
                    }
                ]
          ```

          ```js
            //app.js

            import base from './css/base.css'
            import common from './css/common.css'

            base.use()
            base.unuse()

            var flag = false

            setInterval(function(){
                if(flag){
                    base.unuse()
                }else{
                    base.use()
                }
                flag = !flag
            },500)
          ```

    ---

    - css-loader
        - 让js可以import CSS进来

        - 注意顺序，放在后面的越先被引入，比如下面的```css-loader```就先被引入。
            
            ```js
            moudle:{
                rules:[
                    {
                        test:/\.css$/,
                        use:[
                            {
                                loader:'style-loader'
                            },
                            {
                                loader:'css-loader'
                            }
                        ]
                    }
                ]
            }
            ```
        - options
            - alias （解析的别名）

            - importLoader （@import ）

            - Minimize （是否压缩）

            - modules （启用css-modules）

 - CSS模块化

    - 可以在js中引入css的某个样式(此时类名会被替换成随机类名,可通过```localIdentName```配置)
    - 可以在css中用composes引入css某个样式

    示例

    ```css
    /* base.css*/
    .box{
        composes: bigBox from './common.css';/* 最好放前面，否则引入顺序有问题 */
        width: 200px;
        height: 200px;
        border-radius: 4px;
        background: #333;

    }
    ```

    ```js
    /*app.js */
    import base from './css/base.css'
    import common from './css/common.css'

    document.getElementById('app')
    app.innerHTML = '<div class="' + base.box + '"></div>'
    ```

 - CSS预编译器（less，sass）

    - less
        - 需安装less，less-loader

 - 提取CSS代码（单独缓冲，也有可能被公用）

    - extract-loader(主流方式)
        - ExtractTextWebpackPlugin（需要手动引入css）
            
            - install
            
            ```js
            npm i --save-dev extract-text-webpack-plugin webpack
            ```

            - usage

            ```js

            var webpack = require('webpack')
            var path = require('path')
            const CleanWebpackPlugin = require('clean-webpack-plugin') //清除dist目录
            const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

            //other content...

            rules: 
                [{
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
                }],
            plugins: [
                new CleanWebpackPlugin('./dist'),
                new ExtractTextWebpackPlugin({
                    filename: '[name].min.css',
                    allChunks:false//默认false，如果为true，会把所有依赖的css都提取出来，如果为false，只有初始化的css加载（异步加载之外）
                })
            ]
            ```

 - PostCSS(后编译器)

    - 放置位置

        - css-loader之后，预处理编译器（less-loader，sass-loader等）之前

    - install
        - postcss

        - postcss-loader
        
        - autoprefixer
            - 加上浏览器前缀，使各个浏览器能识别语法

        - cssnano
            - 压缩css，与css-loader的压缩一致

        - postcss-cssnext
            - 可以使用css未来的语法
                - css变量,css variables
                - 定制选择器,custom selector
                - calc()
    
    - usage
    
        - postcss

        ```js
        //webpack.config.js
        {
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
            }
        ```

        - 所有插件都共用一份兼容配置
            - 都放在package.json
            - .browserlistrc
        
---

 - TreeShaking

    - js使用场景

        - 常规优化(本地优化)

        ```js
           plugins: [new webpack.optimize.UglifyJsPlugin()]
        ```

        - 引入第三方库的某部分功能

    - css

        -purifycss-webpack

        >这部分需要再看文档，现在demo有问题
