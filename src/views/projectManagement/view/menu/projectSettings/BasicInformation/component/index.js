import BasicInformation from './BasicInformation'
import advancedconfiguration from '@/views/projectManagement/components/codemirror'
import Oversoldstrategy from './Oversoldstrategy'
import Usage from './Usage'
import Exclusivehost from './Exclusivehost'
import securitystrategy  from './securitystrategy'

let a =  [
    {
    name:BasicInformation,
    id:1
}
,
    {
    name:advancedconfiguration,
    id:2
}
,
    {
    name:Oversoldstrategy,
    id:3
}
,
    {
    name:Usage,
    id:4
}
,
    {
    name:Exclusivehost,
    id:6
}
,
    {
    name:securitystrategy,
    id:7
}
]

export default a.map(e => {
    return {
        component:e.name,
        id:e.id
    }
})