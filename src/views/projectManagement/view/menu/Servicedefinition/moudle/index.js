import Addagreement from './Addagreement'
import Issued from './Issued'
import Detail from './Detail'

let a = [Addagreement,Issued,Detail]

export default a.map((e,id) => {
    return {
        id:id+1,
        component:e
    }
})