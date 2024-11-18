// @todo: Темплейт карточки
import { handleEscClose } from "../scripts/modal.js";
import { addLikeButtonHandler } from "../scripts/card.js";
import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import { createCard } from "../scripts/card.js";
import { openPopup } from '../scripts/modal.js';
// @todo: Темплейт карточки

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

// @todo: DOM узлы

// обработчик для открытия попапа с новой карточкой
addCardButton.addEventListener("click", () => {
  popupNewCard.classList.add("popup_is-animated");
  setTimeout(() => {
    popupNewCard.classList.add("popup_is-opened");
  }, 0);
  document.addEventListener("keydown", handleEscClose);
});

// обработчик для закрытия попапа с новой карточкой
closeButton.addEventListener("click", () => {
  closePopup(popupNewCard);
});

// обработчик закрытия Popup
imagePopupCloseButton.addEventListener("click", closeImagePopup);

// Обновленная функция открытия Popup с анимацией
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openPopup(imagePopup);
  imagePopup.classList.add("popup_is-animated");
  setTimeout(() => {
    imagePopup.classList.add("popup_is-opened");
  }, 0);
  document.addEventListener("keydown", (evt) => handleEscClose(evt, closePopup)); // Добавляем обработчик
}

// Обновленная функция закрытия Popup с анимацией
function closeImagePopup() {
  imagePopup.classList.remove("popup_is-opened");
  setTimeout(() => {
    imagePopup.classList.remove("popup_is-animated");
  }, 300); 
}

// @todo: Функция создания карточки


// @todo: Функция удаления карточки
const deleteCard = function (cardElement) {
  cardElement.remove();
  return cardElement;
};

// @todo: Вывести карточки на страницу
const renderCard = function (cards) {
  const placesListElement = document.querySelector(".places__list");
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, openImagePopup);
    placesListElement.append(cardElement);
  });
};

renderCard(initialCards);

  const cardDeleteButtons = document.querySelectorAll(".card__delete-button");
  cardDeleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deleteCard(button.closest(".card"));
    });
  });

renderCard(initialCards);

// Функция добавления новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(newCard, openImagePopup);
  document.querySelector(".places__list").prepend(cardElement);

  closePopup(popupNewCard);
  newCardForm.reset();

  const cardDeleteButtons = document.querySelectorAll(".card__delete-button");
  cardDeleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deleteCard(button.closest(".card"));
    });
  });
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

// Обновленная функция открытия модального окна редактирования профиля с анимацией
editProfileButton.addEventListener("click", () => {
  nameInputEdit.value = profileTitle.textContent;
  descriptionInputEdit.value = profileDescription.textContent;
  popupEditProfile.classList.add("popup_is-animated");
  setTimeout(() => {
    popupEditProfile.classList.add("popup_is-opened");
  }, 0);
  document.addEventListener("keydown", handleEscClose); 
});

// 
closeEditProfileButton.addEventListener("click", () => {
  popupEditProfile.classList.remove("popup_is-opened");
  setTimeout(() => {
    popupEditProfile.classList.remove("popup_is-animated");
  }, 300); 
});


editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInputEdit.value;
  profileDescription.textContent = descriptionInputEdit.value;
  popupEditProfile.classList.remove("popup_is-opened");
});


function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 300); 
}

// Закрытие попапа кликом на оверлей
function closePopupOnOverlayClick(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}

// Добавляем обработчики для всех попапов
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", closePopupOnOverlayClick);
});