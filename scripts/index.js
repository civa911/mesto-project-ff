// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

// @todo: DOM узлы



//Функция лайка карточки
document.addEventListener('DOMContentLoaded', () => {
    const likeCardButtons = document.querySelectorAll('.card__like-button');
    
    likeCardButtons.forEach(button => {
        button.addEventListener('click', evt => {
            evt.currentTarget.classList.toggle('card__like-button_is-active');
        });
    });
})

// Функция открытия Popup
function openImagePopup(imageSrc, imageCaption) {
  popupImage.src = imageSrc;
  popupImage.alt = imageCaption;
  popupCaption.textContent = imageCaption;
  imagePopup.classList.add('popup_is-opened');
}

// Функция закрытия Popup
function closeImagePopup() {
  imagePopup.classList.remove('popup_is-opened');
}

// Добавляем обработчик закрытия Popup
imagePopupCloseButton.addEventListener('click', closeImagePopup);

// @todo: Функция создания карточки
const createCard = function (cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    
    cardImage.addEventListener('click', () => {
        openImagePopup(cardData.link, cardData.name);
    });
    
    cardElement.querySelector('.card__title').textContent = cardData.name;
    
    cardElement.addEventListener('click', addEventListener);
    
    return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = function (cardElement) {
    cardElement.remove();
    return cardElement;
}

// @todo: Вывести карточки на страницу
const renderCard = function (cards) {
    const placesListElement = document.querySelector('.places__list');
    cards.forEach(cardData => {
        const cardElement = createCard(cardData);
        placesListElement.append(cardElement);
    });
    const cardDeleteButtons = document.querySelectorAll('.card__delete-button');
    cardDeleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            deleteCard(button.closest('.card'));
        });
    });
}

renderCard(initialCards);