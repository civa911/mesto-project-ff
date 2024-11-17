// @todo: Темплейт карточки

import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
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

//Функция лайка карточки
const like = document.addEventListener("DOMContentLoaded", () => {
  const likeCardButtons = document.querySelectorAll(".card__like-button");

  likeCardButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
      evt.currentTarget.classList.toggle("card__like-button_is-active");
    });
  });
});

// Функция для закрытия попапа нажатием на Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}


// Обновленная функция открытия Popup с анимацией
function openImagePopup(imageSrc, imageCaption) {
  popupImage.src = imageSrc;
  popupImage.alt = imageCaption;
  popupCaption.textContent = imageCaption;
  imagePopup.classList.add("popup_is-animated");
  setTimeout(() => {
    imagePopup.classList.add("popup_is-opened");
  }, 0);
  document.addEventListener("keydown", handleEscClose); // Добавляем обработчик
}

// Обновленная функция закрытия Popup с анимацией
function closeImagePopup() {
  imagePopup.classList.remove("popup_is-opened");
  setTimeout(() => {
    imagePopup.classList.remove("popup_is-animated");
  }, 300); // Задержка должна совпадать с длительностью анимации в CSS
}

// Добавляем обработчик закрытия Popup
imagePopupCloseButton.addEventListener("click", closeImagePopup);

// @todo: Функция создания карточки
const createCard = function (cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  cardElement.querySelector(".card__title").textContent = cardData.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => {
    evt.currentTarget.classList.toggle("card__like-button_is-active");
  });

  addCardButton.addEventListener("click", () => {
    popupNewCard.classList.add("popup_is-opened");
  });

  closeButton.addEventListener("click", () => {
    popupNewCard.classList.remove("popup_is-opened");
  });

  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = function (cardElement) {
  cardElement.remove();
  return cardElement;
};

// @todo: Вывести карточки на страницу
const renderCard = function (cards) {
  const placesListElement = document.querySelector(".places__list");
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    placesListElement.append(cardElement);
  });

  const likeCardButtons = document.querySelectorAll(".card__like-button");
  likeCardButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
      evt.currentTarget.classList.toggle("card__like-button_is-active");
    });
  });

  const cardDeleteButtons = document.querySelectorAll(".card__delete-button");
  cardDeleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deleteCard(button.closest(".card"));
    });
  });
};

renderCard(initialCards);

// Функция добавления новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(newCard);
  document.querySelector(".places__list").prepend(cardElement);

  popupNewCard.classList.remove("popup_is-opened");
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
  document.addEventListener("keydown", handleEscClose); // Добавляем обработчик
});

// Обновленная функция закрытия модального окна редактирования профиля с анимацией
closeEditProfileButton.addEventListener("click", () => {
  popupEditProfile.classList.remove("popup_is-opened");
  setTimeout(() => {
    popupEditProfile.classList.remove("popup_is-animated");
  }, 300); // Задержка должна совпадать с длительностью анимации в CSS
});

// Обработка отправки формы редактирования профиля
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInputEdit.value;
  profileDescription.textContent = descriptionInputEdit.value;
  popupEditProfile.classList.remove("popup_is-opened");
});

// Обновленная функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 300); // Задержка должна совпадать с длительностью анимации в CSS
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