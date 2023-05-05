export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers
  }
  _getRespond (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo () {
    return fetch(`${this._url}/users/me`,{
     headers: this._headers
   })
   .then(this._getRespond)
   };

   getCards () {
    return fetch(`${this._url}/cards`,{
      headers: this._headers
    })
    .then(this._getRespond)
  };

  postCards ({name, url}) {
    return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      link: url
    })
    })
    .then(this._getRespond)
  };

  patchUserInfo ({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers, 
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
    .then(this._getRespond)
  };

  deleteCard (id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getRespond)
  };

  updateLikes (like, id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers
    })
    .then(this._getRespond)
  }
  // 
  updateAvatar (url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(this._getRespond)
  }
}