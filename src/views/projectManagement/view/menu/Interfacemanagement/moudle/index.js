import Addagreement from './yinshe'
import Issued from './Issued'

let a = [Addagreement,Issued]

export default a.map((e,id) => {
    return {
        id:id+1,
        component:e
    }
})