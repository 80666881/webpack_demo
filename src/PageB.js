import * as _ from 'lodash' 

var page = 'subPageB'


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
export default 'subPageB'