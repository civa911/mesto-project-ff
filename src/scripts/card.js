// import { openImagePopup } from './modal.js'
const cardTemplate = document.querySelector("#card-template").content;

//Функция лайка карточки
export function addLikeButtonHandler(cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => {
    evt.currentTarget.classList.toggle("card__like-button_is-active");
  });
}
//Функция создания карточки
export const createCard = function (cardData, onOpenImagePopup) {
  const cardElement = cardTemplate.cloneNode(true).querySelector('.card');;
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => {
    onOpenImagePopup(cardData);
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  
  cardElement.querySelector(".card__title").textContent = cardData.name;

  addLikeButtonHandler(cardElement);

  return cardElement;
};

//Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}