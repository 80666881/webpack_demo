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