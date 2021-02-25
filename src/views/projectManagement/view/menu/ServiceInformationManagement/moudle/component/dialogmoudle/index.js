import Configuration from './Configuration'
import advancedconfiguration from '@/views/projectManagement/components/codemirror'

let a =  [
    {
    name:Configuration,
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