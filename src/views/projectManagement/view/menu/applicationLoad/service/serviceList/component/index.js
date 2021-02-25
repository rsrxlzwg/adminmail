import Configuration from './Configuration'
import advancedconfiguration from '@/views/projectManagement/components/codemirror'

let a =  [
    {
    name:Configuration,
    id:11
},
    {
    name:advancedconfiguration,
    id:12
}
]

export default a.map(e => {
    return {
        component:e.name,
        id:e.id
    }
})