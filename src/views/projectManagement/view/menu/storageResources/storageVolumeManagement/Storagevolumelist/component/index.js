import pv from './addpv'
import sc from './addsc'
let a =  [
    {
    name:pv,
    id:1
},
    {
    name:sc,
    id:2
}
]

export default a.map(e => {
    return {
        component:e.name,
        id:e.id
    }
})