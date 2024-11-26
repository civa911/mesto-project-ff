import '../pages/index.css';
import { createCard } from '../scripts/card.js';
import { openPopup, closePopup } from '../scripts/modal.js';
import { enableValidation, clearValidation } from '../scripts/validation.js';
import { getUserInfo, updateAvatarRequest, getCardsRequest, createNewCardRequest, updateProfileInfoRequest, deleteLikeRequest, putLikeRequest, deleteCardRequest } from '../scripts/api.js';

// Селекторы элементов
const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const addCard = document.querySelector('.popup_type_new-card');
const popupEditOpener = document.querySelector('.profile__edit-button');
const popupUpdateAvatar = document.querySelector('.popup-update-avatar');
const popupAvatarUrl = document.querySelector('.popup__input_avatar_url');
const profileImage = document.querySelector('.profile__image');
const popupAddOpener = document.querySelector('.profile__add-button');
const popupConfirmDelete = document.querySelector('.popup-confirm-delete');
const popupClosers = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const editProfile = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const avatarForm = document.forms['new-avatar'];
const deleteCardForm = document.forms['delete-card'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
let myId = null;

const loading = {
  start: btn => btn.textContent = 'Сохранение..',
  stop: btn => btn.textContent = 'Сохранить',
}

const Config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.button_inactive',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__input-error_active'
};

enableValidation(Config);


// Открытие попапа аватара
const openPopupAvatar = () => {
  openPopup(popupUpdateAvatar);
  avatarForm.reset();
  clearValidation(avatarForm, Config);
};

profileImage.addEventListener('click', openPopupAvatar);

avatarForm.addEventListener('submit', function(evt) {
  loading.start(evt.submitter);
  evt.preventDefault();
  updateAvatarRequest(popupAvatarUrl.value)
    .then((newUser) => {
      profileImage.style.backgroundImage = `url('${newUser.avatar}')`;
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
    .finally(() => {
      loading.stop(evt.submitter);
      closePopup(popupUpdateAvatar);
    });
});

// Открытие попапа профиля
const openPopupProfile = () => {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(editProfile);
  clearValidation(editProfileForm, Config);
};

popupEditOpener.addEventListener('click', openPopupProfile);

// Обновление информации о пользователе
const updateUserInfo = (user) => {
  name.textContent = user.name;
  job.textContent = user.about;
  profileImage.style.backgroundImage = `url('${user.avatar}')`;
};

// Обработка отправки формы профиля
function handleProfileFormSubmit(evt) {
  loading.start(evt.submitter);
  evt.preventDefault();
  const dataToSend = {
    name: nameInput.value,
    about: jobInput.value
  };
  updateProfileInfoRequest(dataToSend)
    .then((newData) => {
      name.textContent = newData.name;
      job.textContent = newData.about;
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
    .finally(() => {
      loading.stop(evt.submitter);
      closePopup(editProfile);
    });
}

// Открытие изображения карточки
export const openCardImage = (e) => {
  popupTypeImage.querySelector('.popup__content').classList.add('popup__content_content_image');
  document.querySelector('.popup__image').src = e.target.src;
  document.querySelector('.popup__caption').textContent = e.target.alt;
  openPopup(popupTypeImage);
};

// Открытие попапа добавления карточки
const openPopupCard = () => {
  openPopup(addCard);
  cardForm.reset();
  clearValidation(cardForm, Config);
};

popupAddOpener.addEventListener('click', openPopupCard);

// Добавление новой карточки
function addCardFunc(evt) {
  loading.start(evt.submitter);
  evt.preventDefault();
  createNewCardRequest({
    name: inputName.value,
    link: inputLink.value,
  })
    .then((newCardData) => {
      const cardElement = createCard(
        newCardData.name,
        newCardData.link,
        newCardData._id,
        newCardData.owner._id,
        myId,
        newCardData.likes,
        openCardImage,
        handleDeleteCard,
        likeFunction
      );
      loading.stop(evt.submitter);
      closePopup(addCard);
      placesList.prepend(cardElement);
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    });
}

// Удаление карточки
let cardForDelete = {};
const handleDeleteCard = (cardId, cardElement) => {
  cardForDelete = {
    id: cardId,
    cardElement
  };
  openPopup(popupConfirmDelete);
};

const handleDeleteCardSubmit = (evt) => {
  evt.preventDefault();
  if (!cardForDelete.cardElement) return;

  deleteCardRequest(cardForDelete.id)
    .then(() => {
      cardForDelete.cardElement.remove();
      closePopup(popupConfirmDelete);
      cardForDelete = {};
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    });
};

// Подтверждение удаления карточки
deleteCardForm.addEventListener('submit', handleDeleteCardSubmit);
// Обработчик добавления карточки
cardForm.addEventListener('submit', addCardFunc);
// Обработчик редактирования профиля
formElement.addEventListener('submit', handleProfileFormSubmit);
// Обработчик закрытия попапа
popupClosers.forEach((popupCloser) => {
  const popupElement = popupCloser.closest('.popup');
  popupCloser.addEventListener("click", () => closePopup(popupElement));
});

Promise.all([getUserInfo(), getCardsRequest()])
  .then(([user, cards]) => {
    myId = user._id;
    updateUserInfo(user);
    showInitialCards(cards);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

// Вывод карточек
const showInitialCards = (cards) => {
  cards.forEach((el) => {
    placesList.append(createCard(el.name, el.link, el._id, el.owner._id, myId, el.likes, openCardImage, handleDeleteCard, likeFunction));
  });
};

// Постановка/удаление лайка
function likeFunction(likeButton, { cardId, likeCount }) {
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? deleteLikeRequest : putLikeRequest;
  likeMethod(cardId)
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCount.textContent = res.likes.length;
    })
    .catch(err => console.log(err));
}
