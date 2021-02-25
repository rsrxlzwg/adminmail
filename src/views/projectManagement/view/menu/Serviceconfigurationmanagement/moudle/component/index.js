import BasicInformation from './BasicInformation'
import advancedconfiguration from '@/views/projectManagement/view/menu/Serviceidentification'
import Servicepermissions from '@/views/projectManagement/view/menu/Servicepermissions'

let a =  [
    {
    name:BasicInformation,
    id:1
},
    {
    name:advancedconfiguration,
    id:2
},
    {
    name:Servicepermissions,
    id:3
}
]

export default a.map(e => {
    return {
        component:e.name,
        id:e.id
    }
})