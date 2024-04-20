import service from ".."

export function authCode() {
  return service({
    method: 'get',
    url: '/login/code',
    noMessage: true
  })
}

export function submit(data) {
  return service({
    method: 'post',
    url: '/login/login',
    data
  })
}

