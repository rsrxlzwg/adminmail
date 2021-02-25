/**
 * @auth Z
 * @alias 扩展路由传参
 * */
function trimall(str) {
  let inner
  inner = str.substr(0, str.length - 1)
  inner = inner.replace(/\s+/g, '')
  return '?' + inner
}

function Objtodate(obj) {
  let str
  for (const [key, value] of Object.entries(obj)) {
    str += `${key} = ${value}&`
  }
  return trimall(str)
}
/**
 * @params url  string
 * @params obj  OBJ params
 * */
const basenavegiter = (type, url, obj) => {
  // obj转date
  const paramsstr = Objtodate.call(this, obj)
  //
  switch (type) {
    case 'nav':
      // ....
      break
    case 'tab':
      // ....
      break
  }
}

const duringobj = Object.create({})
duringobj.install = (vue) => {
  vue.prototype.$navageter = basenavegiter
}
export default duringobj
