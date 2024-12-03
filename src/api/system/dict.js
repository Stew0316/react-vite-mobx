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

export function delBatch(ids) {
  return service({
    method: 'post',
    url: '/dict/delete-batch',
    data: {
      ids
    }
  })
}

export function addItem(data) {
  return service({
    method: 'post',
    url: '/dict/add',
    data
  })
}

export function editItem(data) {
  return service({
    method: 'post',
    url: '/dict/update',
    data
  })
}

export function getList(params) {
  return service({
    method: 'get',
    url: '/dict/page',
    params
  })
}