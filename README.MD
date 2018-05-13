## tutorial for webpack 3.x

please checkout the branch to refer different feature.

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



 - 提取CSS代码（单独缓冲，也有可能被公用）