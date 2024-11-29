import service from ".."

export function getParent(params) {
  return service({
    method: 'get',
    url: '/dict/parent-page',
    params
  })
}

export function delItem(id) {
  return service({
    method: 'post',
    url: '/dict/delete',
    data: {
      id
    }
  })
}