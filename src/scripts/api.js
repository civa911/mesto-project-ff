const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-21',
  headers: {
    authorization: 'b81b799d-5dff-409c-bb91-a9e0a45c29ac',
    'Content-Type': 'application/json'
  }
};

// Обработчик ошибок
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Запросы к API
export const updateProfileInfoRequest = (data) => fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify(data)
}).then(handleResponse);

export const getUserInfo = () => fetch(`${config.baseUrl}/users/me`, {
  method: 'GET',
  headers: config.headers,
}).then(handleResponse);

export const getCardsRequest = () => fetch(`${config.baseUrl}/cards`, {
  method: 'GET',
  headers: config.headers,
}).then(handleResponse);

export const updateAvatarRequest = (avatarLink) => fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({ avatar: avatarLink })
}).then(handleResponse);

export const createNewCardRequest = (cardData) => fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify(cardData)
}).then(handleResponse);

export const putLikeRequest = (cardId) => fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: config.headers,
}).then(handleResponse);

export const deleteLikeRequest = (cardId) => fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: config.headers,
}).then(handleResponse);

export const deleteCardRequest = (cardId) => fetch(`${config.baseUrl}/cards/${cardId}`, {
  method: 'DELETE',
  headers: config.headers,
}).then(handleResponse);
