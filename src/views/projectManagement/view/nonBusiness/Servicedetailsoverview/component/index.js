import BasicInformation from './BasicInformation'
import advancedconfiguration from '@/views/projectManagement/components/codemirror'

let a =  [
    {
    name:BasicInformation,
    id:1
},
    {
    name:advancedconfiguration,
    id:2
}
]

export default a.map(e => {
    return {
        component:e.name,
        id:e.id
    }
})