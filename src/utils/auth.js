import Cookies from 'js-cookie'

const TokenKey = 'csrftoken'

export function getToken() {
  var token = Cookies.get(TokenKey)
  return token
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
