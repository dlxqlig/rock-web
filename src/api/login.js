import request from '@/utils/request'

export function login(username, password, key, code) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password,
      key,
      code
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
