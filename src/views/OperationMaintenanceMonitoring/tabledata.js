
import Mock from 'mockjs'
const template = {
  'list|20': [
    {
      'status|1': ['published', 'draft', 'deleted'],
      'type|1': ['success', 'danger'],
      display_time: '@datetime',
      date: '@increment()',
      name: '@tld()',
      address: '@protocol()',
      desc: '@guid()'
    }
  ]
}
const data = Mock.mock(template).list
export default data
