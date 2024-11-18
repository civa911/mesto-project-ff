import { handleEscClose, openPopup, closePopup, closePopupOnOverlayClick } from "../scripts/modal.js";
import { initialCards } from "../scripts/cards.js";
import { createCard } from "../scripts/card.js";
import "../pages/index.css";

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const addCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeButton = popupNewCard.querySelector(".popup__close");
const newCardForm = popupNewCard.querySelector(".popup__form");
const nameInput = popupNewCard.querySelector(".popup__input_type_card-name");
const linkInput = popupNewCard.querySelector(".popup__input_type_url");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const closeEditProfileButton = popupEditProfile.querySelector(".popup__close");
const editProfileForm = popupEditProfile.querySelector(".popup__form");
const nameInputEdit = popupEditProfile.querySelector(".popup__input_type_name");
const descriptionInputEdit = popupEditProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const placesListElement = document.querySelector(".places__list");

// Открытие попапа с новой карточкой
addCardButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

// Закрытие попапа с новой карточкой
closeButton.addEventListener("click", () => {
  closePopup(popupNewCard);
});

// Закрытие попапа изображения
imagePopupCloseButton.addEventListener("click", () => {
  closePopup(imagePopup);
});

// Открытие изображения
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

// Вывод карточек на страницу
const renderCard = function (cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, openImagePopup);
    placesListElement.append(cardElement);
  });
};

renderCard(initialCards);

// Добавление новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(newCard, openImagePopup);
  placesListElement.prepend(cardElement);

  closePopup(popupNewCard);
  newCardForm.reset();
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

// Открытие модального окна редактирования профиля
editProfileButton.addEventListener("click", () => {
  nameInputEdit.value = profileTitle.textContent;
  descriptionInputEdit.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

closeEditProfileButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInputEdit.value;
  profileDescription.textContent = descriptionInputEdit.value;
  closePopup(popupEditProfile);
});

// Добавляем обработчики для всех попапов
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", closePopupOnOverlayClick);
});