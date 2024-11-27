import { removeLike, addLike } from './api.js';

export function removeCard(cardElement) {
  cardElement.remove();
}

export function generateCard(cardData, userId, displayCardImage, confirmDeleteCard, toggleLike) {
  const { name, link, _id: cardId, owner: { _id: ownerId }, likes } = cardData;

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.like-count');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  if (ownerId !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      confirmDeleteCard(cardId, cardElement);
    });
  }

  if (likes) {
    if (likes.some(like => like._id === userId)) {
      likeButton.classList.add('card__like-button_is-active');
    } else {
      likeButton.classList.remove('card__like-button_is-active');
    }
    likeCount.textContent = likes.length;
  }

  likeButton.addEventListener('click', function() {
    toggleLike(likeButton, {cardId, likeCount});
  });

  cardImage.addEventListener('click', displayCardImage);

  return cardElement;
}

export function toggleLike(likeButton, {cardId, likeCount}) {
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? removeLike : addLike;
  likeMethod(cardId)
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCount.textContent = res.likes.length;
    })
    .catch(console.error);
}