import request from '@/utils/request'
export function getTemplates(data) {
  return request({
    url: '/gov/app/param/templates',
    method: 'post',
    data
  })
}
export function addTemplate(data) {
  return request({
    url: '/gov/app/param/template',
    method: 'post',
    data
  })
}
export function editTemplate(data) {
  return request({
    url: '/gov/app/param/template',
    method: 'put',
    data
  })
}
export function deleteTemplate(data) {
  return request({
    url: `/gov/app/param/template/${data}`,
    method: 'delete',
    data
  })
}
export function sendTemplates() {
  return request({
    url: `/gov/app/param/templates/send`,
    method: 'put'
  })
}
