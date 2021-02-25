import BasicInformation from './BasicInformation'
import advancedconfiguration from '@/views/projectManagement/components/codemirror'
import ccontainergroup from './ccontainergroup'
import overview from './overview'
import historicversion from './historicversion'
import release from './release'
import mirrorcertification from './mirrorcertification'
import realtimelog from './realtimelog'
import event from './event'

let a =  [
    {
    name:overview,
    id:1
},
    {
    name:advancedconfiguration,
    id:''
}
,
    {
    name:ccontainergroup,
    id:2
}
,
    {
    name:historicversion,
    id:3
}
,
    {
    name:release,
    id:4
}
,
    {
    name:mirrorcertification,
    id:5
}
,
    {
    name:realtimelog,
    id:6
}
,
    {
    name:event,
    id:7
}
]

export default a.map(e => {
    return {
        component:e.name,
        id:e.id
    }
})