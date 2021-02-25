import Addagreement from './Addagreement'
import Issued from './Issued'
import ParameterEdit from './parameterEdit'


let a = [Addagreement,Issued,ParameterEdit]

export default a.map((e,id) => {
    return {
        id:id+1,
        component:e
    }
})