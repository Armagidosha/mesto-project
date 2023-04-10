export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '51223542-913b-4f70-95e2-80679cf69654',
    'Content-Type': 'application/json'
  }
}

const getRespond = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}
// ----------------------------------------------------
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`,{
   headers: config.headers
 })
 .then(getRespond)
 };
// ----------------------------------------------------
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`,{
    headers: config.headers
  })
  .then(getRespond)
};
// ----------------------------------------------------
export const postCards = ({name, url}) => {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    link: url
  })
  })
  .then(getRespond)
};
// ----------------------------------------------------
export const patchUserInfo = ({name, about}) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers, 
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
  .then(getRespond)
};
// ----------------------------------------------------
export const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getRespond)
};
// ----------------------------------------------------
export const updateLikes = (like, id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: like ? 'PUT' : 'DELETE',
    headers: config.headers
  })
  .then(getRespond)
}
// 
export const updateAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(getRespond)
}