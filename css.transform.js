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