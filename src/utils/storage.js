/**
 * @auth Z
 * @alias 增加存储类型
 *
 **/
const setdata = (id, key, value) => {
  let seller = localStorage.getItem('__seller__')
  if (!seller) {
    seller = Object.create({})
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  localStorage.setItem('__seller__', JSON.stringify(seller))
}
const getdata = (id, key, def) => {
  let seller = localStorage.getItem('__seller__')
  if (!seller) {
    return def
  } else {
    seller = JSON.parse(seller)[id]
    if (!seller) {
      return def
    }
  }
  return seller[id][key] || def
}

export default {
  setdata,
  getdata
}
