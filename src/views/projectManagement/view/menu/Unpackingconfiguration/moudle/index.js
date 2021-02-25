import Addagreement from './Addagreement'
import Issued from './Issued'
import editxml from './editxml'

let a = [Addagreement,Issued,editxml]

export default a.map((e,id) => {
    return {
        id:id+1,
        component:e
    }
})