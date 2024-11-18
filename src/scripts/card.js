import { openImagePopup } from './modal.js'
const cardTemplate = document.querySelector("#card-template").content;

//Функция лайка карточки
export function addLikeButtonHandler(cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => {
    evt.currentTarget.classList.toggle("card__like-button_is-active");
  });
}

export const createCard = function (cardData, onOpenImagePopup) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => {
    onOpenImagePopup(cardData);
  });

  cardElement.querySelector(".card__title").textContent = cardData.name;

  addLikeButtonHandler(cardElement);

  return cardElement;
};