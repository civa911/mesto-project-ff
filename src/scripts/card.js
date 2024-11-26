export const generateCard = function (name, link, cardId, ownerId, myId, likes, displayCardImage, confirmDeleteCard, toggleLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.like-count');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  if (ownerId !== myId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      confirmDeleteCard(cardId, cardElement);
    });
  }

  if (likes) {
    if (likes.some(like => like._id === myId)) {
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
};