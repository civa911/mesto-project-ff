//Функция создания карточки
export const createCard = function (name, link, cardId, ownerId, myId, likes, openCardImage, onDeleteCard, likeFunction) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.like-count');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Определяем хозяина карточки, если не мы, то удаляем иконку удаления
  if (ownerId !== myId) {
    deleteButton.remove();
  } else {
    // Вызов попапа удаления карточки
    deleteButton.addEventListener("click", () => {
      onDeleteCard(cardId, cardElement);
    });
  }

  // Если у карточки есть лайки
  if (likes) {
    // Меняем состояние кнопки, если среди лайков есть наши
    if (likes.some(like => like._id === myId)) {
      likeButton.classList.add('card__like-button_is-active');
    } else {
      likeButton.classList.remove('card__like-button_is-active');
    }
    // Устанавливаем количество лайков
    likeCount.textContent = likes.length;
  }

  // Слушатель кликов на кнопку лайка
  likeButton.addEventListener('click', function() {
    likeFunction(likeButton, {cardId, likeCount});
  });

  // Слушатель увеличения картинки
  cardImage.addEventListener('click', openCardImage);

  return cardElement;
};