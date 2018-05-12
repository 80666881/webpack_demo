//由于subPageA和subPageB都引入moduleA，所以可以在父模块引入moduleA，使其打包公共代码，此时用到include方法
require.include('./moduleA.js')

// import  './subPageA'
var page = 'subPageA'


if (page === 'subPageA') {

    // ensure方法引入，需要require才会执行

    // require.ensure(['./subPageA.js'], function () { //[]中的dependencies可以不写
    //     var subPageA = require('./subPageA') //需要require才会执行
    // }, 'subPageA')


    //动态import引入，立即执行

    import(/* webpackChunkName:"subPageA" */'./subPageA')
    .then(function (subPageA) {
        console.log(subPageA)
    })


} else if (page === 'subPageB') {
    // import  './subPageB'
    require.ensure(['./subPageB.js'], function () {
        var subPageA = require('./subPageB')
    }, 'subPageB')
}
// import * as _ from 'lodash'
//代码分割例子
require.ensure([], function () {
    var _ = require('lodash')
    _.join(['1', '2'], '3')
}, 'vendor')

export default 'pageA'