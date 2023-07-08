import { mestoServerAddress, token } from './constants';

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return this._request(`${this._url}cards`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  getUserInfo() {
    return this._request(`${this._url}users/me`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  setUserInfo(name, about) {
    return this._request(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
      credentials: 'include',
    });
  }

  setUserAvatar(avatar) {
    return this._request(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  addCard(name, link) {
    return this._request(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    });
  }

  toggleLike(cardId, isLiked) {
    return this._request(`${this._url}cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
      credentials: 'include',
    });
  }
}

const api = new Api({
  url: mestoServerAddress,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  },
});

export default api;
