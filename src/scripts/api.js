const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-21",
  headers: {
    authorization: "b81b799d-5dff-409c-bb91-a9e0a45c29ac",
    "Content-Type": "application/json",
  },
};

const handleApiResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const updateProfile = (data) =>
  fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(data),
  }).then(handleApiResponse);

export const fetchUserInfo = () =>
  fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then(handleApiResponse);

export const fetchCards = () =>
  fetch(`${apiConfig.baseUrl}/cards`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then(handleApiResponse);

export const removeLike = (cardId) =>
  fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleApiResponse);

export const deleteCard = (cardId) =>
  fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleApiResponse);

export const updateAvatar = (avatarLink) =>
  fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({ avatar: avatarLink }),
  }).then(handleApiResponse);

export const createCard = (cardData) =>
  fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(cardData),
  }).then(handleApiResponse);

export const addLike = (cardId) =>
  fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(handleApiResponse);
