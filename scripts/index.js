// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const addCardButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closeButton = popupNewCard.querySelector('.popup__close');
const newCardForm = popupNewCard.querySelector('.popup__form');
const nameInput = popupNewCard.querySelector('.popup__input_type_card-name');
const linkInput = popupNewCard.querySelector('.popup__input_type_url');

// @todo: DOM узлы

addCardButton.addEventListener('click', () => {
    popupNewCard.classList.add('popup_is-opened');
 });

 closeButton.addEventListener('click', () => {
    popupNewCard.classList.remove('popup_is-opened');
 });

// @todo: Функция создания карточки
const createCard = function (cardData) {
    const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    
    cardImage.addEventListener('click', () => {
        openImagePopup(cardData.link, cardData.name);
    });
    
    cardElement.querySelector('.card__title').textContent = cardData.name;
    

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    return cardElement;
}

const placesListElement = document.querySelector('.places__list');

newCardForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    
    const newCard = {
        name: nameInput.value,
        link: linkInput.value
    };
    
    const cardElement = createCard(newCard);
    placesListElement.prepend(cardElement);
    
    popupNewCard.classList.remove('popup_is-opened');
    newCardForm.reset();
});

// @todo: Вывести карточки на страницу
function renderCard(cards) {
        
    cards.forEach(cardData => {
        const cardElement = createCard(cardData);
        placesListElement.append(cardElement);
    });
}

renderCard(initialCards);