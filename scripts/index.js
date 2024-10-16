// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
const createCard = function (cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
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