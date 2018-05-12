## tutorial for webpack 3.x

please checkout the branch to refer different feature.

### 代码分割和懒加载

 - webpack methods

    require.ensure([],callback)
         - []:dependencies:依赖，ensure的时候不会执行，只会加载代码
         - callback：callback中require依赖时，依赖才会执行
         - errorCallback
         - chunkName

    require.include([])
         - 引入模块。不执行
         当两个子模块都依赖一个第三方依赖，可以在父模块导入。

 - es 2015 Loader

    System.import() -> import()
    import() -> Promise
    import().then()
    
    可以通过注释的方式进行配置

    ```js
        import(
            /* webpackChunkName: async-chunk-name */
            /* webpackMode: lazy */
            modulename
        )
    ```

   - 代码分割类别

    分离业务代码 和 第三方依赖
    分离业务代码 和 业务公共代码 和 第三方依赖
    分离首次加载 和 访问后加载的代码
