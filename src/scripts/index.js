import { handleEscClose, openPopup, closePopup, closePopupOnOverlayClick } from "../scripts/modal.js";
import { initialCards } from "../scripts/cards.js";
import { createCard } from "../scripts/card.js";
import "../pages/index.css";
import avatarImage from '../images/avatar1.jpg';

const profileAvatar = document.querySelector('.profile__image');
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

// Установка аватара
profileAvatar.style.backgroundImage = `url(${avatarImage})`;

// Открытие попапа с новой карточкой
addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardForm.querySelectorAll('.popup__input-error').forEach((errorElement) => {
    errorElement.textContent = '';
  });
  toggleButtonState(newCardForm, newCardForm.querySelector('.popup__button'));
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

// Функция для проверки валидности формы
function checkInputValidity(inputElement, errorElement) {
  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
  } else {
    errorElement.textContent = '';
  }
}

// Функция для управления состоянием кнопки
function toggleButtonState(formElement, buttonElement) {
  if (formElement.checkValidity()) {
    buttonElement.removeAttribute('disabled');
  } else {
    buttonElement.setAttribute('disabled', true);
  }
}

// Обработчик ввода для формы редактирования профиля
editProfileForm.addEventListener('input', (evt) => {
  const inputElement = evt.target;
  const errorElement = editProfileForm.querySelector(`.${inputElement.name}-input-error`);
  checkInputValidity(inputElement, errorElement);
  toggleButtonState(editProfileForm, editProfileForm.querySelector('.popup__button'));
});

// Очистка ошибок при открытии формы
editProfileButton.addEventListener("click", () => {
  nameInputEdit.value = profileTitle.textContent;
  descriptionInputEdit.value = profileDescription.textContent;
  editProfileForm.querySelectorAll('.popup__input-error').forEach((errorElement) => {
    errorElement.textContent = '';
  });
  toggleButtonState(editProfileForm, editProfileForm.querySelector('.popup__button'));
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

// Обработчик ввода для формы добавления нового места
newCardForm.addEventListener('input', (evt) => {
  const inputElement = evt.target;
  const errorElement = newCardForm.querySelector(`.${inputElement.name}-input-error`);
  checkInputValidity(inputElement, errorElement);
  toggleButtonState(newCardForm, newCardForm.querySelector('.popup__button'));
});