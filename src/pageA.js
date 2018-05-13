import * as _ from 'lodash' 

var page = 'subPageA'


if (page === 'subPageA') {
    import('./subPageA')
    .then(function (subPageA) {
        console.log(subPageA)
    })


} else if (page === 'subPageB') {
    import('./subPageB')
    .then(function (subPageB) {
        console.log(subPageB)
    })
}
export default 'subPageA'