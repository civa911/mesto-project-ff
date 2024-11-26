import { activateValidation, resetValidation } from '../scripts/validation.js';
import { fetchUserInfo, updateAvatar, fetchCards, createCard, updateProfile, removeLike, addLike, deleteCard } from '../scripts/api.js';
import { generateCard } from '../scripts/card.js';
import { showPopup, hidePopup } from '../scripts/modal.js';
import '../pages/index.css';

const elements = {
  cardList: document.querySelector('.places__list'),
  imagePopup: document.querySelector('.popup_type_image'),
  newCardPopup: document.querySelector('.popup_type_new-card'),
  profileEditButton: document.querySelector('.profile__edit-button'),
  avatarUpdatePopup: document.querySelector('.popup-update-avatar'),
  avatarUrlInput: document.querySelector('.popup__input_avatar_url'),
  profileAvatar: document.querySelector('.profile__image'),
  addCardButton: document.querySelector('.profile__add-button'),
  deleteConfirmPopup: document.querySelector('.popup-confirm-delete'),
  closeButtons: document.querySelectorAll('.popup__close'),
  form: document.querySelector('.popup__form'),
  profileEditPopup: document.querySelector('.popup_type_edit'),
  profileForm: document.forms['edit-profile'],
  newCardForm: document.forms['new-place'],
  avatarForm: document.forms['new-avatar'],
  deleteForm: document.forms['delete-card'],
  nameField: document.querySelector('.popup__input_type_name'),
  jobField: document.querySelector('.popup__input_type_description'),
  profileName: document.querySelector('.profile__title'),
  profileJob: document.querySelector('.profile__description'),
  cardNameInput: document.querySelector('.popup__input_type_card-name'),
  cardLinkInput: document.querySelector('.popup__input_type_url')
};

let userId = null;

const loadingState = {
  start: btn => btn.textContent = 'Сохранение..',
  stop: btn => btn.textContent = 'Сохранить',
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.button_inactive',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__input-error_active'
};

activateValidation(validationConfig);

const openAvatarPopup = () => {
  showPopup(elements.avatarUpdatePopup);
  elements.avatarForm.reset();
  resetValidation(elements.avatarForm, validationConfig);
};

elements.profileAvatar.addEventListener('click', openAvatarPopup);

elements.avatarForm.addEventListener('submit', function(evt) {
  loadingState.start(evt.submitter);
  evt.preventDefault();
  updateAvatar(elements.avatarUrlInput.value)
    .then((newUser) => {
      elements.profileAvatar.style.backgroundImage = `url('${newUser.avatar}')`;
    })
    .catch(console.error)
    .finally(() => {
      loadingState.stop(evt.submitter);
      hidePopup(elements.avatarUpdatePopup);
    });
});

const openProfilePopup = () => {
  elements.nameField.value = elements.profileName.textContent;
  elements.jobField.value = elements.profileJob.textContent;
  showPopup(elements.profileEditPopup);
  resetValidation(elements.profileForm, validationConfig);
};

elements.profileEditButton.addEventListener('click', openProfilePopup);

function handleProfileSubmit(evt) {
  loadingState.start(evt.submitter);
  evt.preventDefault();
  const data = {
    name: elements.nameField.value,
    about: elements.jobField.value
  };
  updateProfile(data)
    .then(refreshUserInfo)
    .catch(console.error)
    .finally(() => {
      loadingState.stop(evt.submitter);
      hidePopup(elements.profileEditPopup);
    });
}

export const displayCardImage = (e) => {
  elements.imagePopup.querySelector('.popup__content').classList.add('popup__content_content_image');
  document.querySelector('.popup__image').src = e.target.src;
  document.querySelector('.popup__caption').textContent = e.target.alt;
  showPopup(elements.imagePopup);
};

const openNewCardPopup = () => {
  showPopup(elements.newCardPopup);
  elements.newCardForm.reset();
  resetValidation(elements.newCardForm, validationConfig);
};

elements.addCardButton.addEventListener('click', openNewCardPopup);

function addNewCard(evt) {
  loadingState.start(evt.submitter);
  evt.preventDefault();
  createCard({
    name: elements.cardNameInput.value,
    link: elements.cardLinkInput.value,
  })
    .then((newCardData) => {
      const cardElement = generateCard(
        newCardData.name,
        newCardData.link,
        newCardData._id,
        newCardData.owner._id,
        userId,
        newCardData.likes,
        displayCardImage,
        confirmDeleteCard,
        toggleLike
      );
      loadingState.stop(evt.submitter);
      hidePopup(elements.newCardPopup);
      elements.cardList.prepend(cardElement);
    })
    .catch(console.error);
}

let cardToDelete = {};
const confirmDeleteCard = (cardId, cardElement) => {
  cardToDelete = { id: cardId, cardElement };
  showPopup(elements.deleteConfirmPopup);
};

const refreshUserInfo = (user) => {
  elements.profileName.textContent = user.name;
  elements.profileJob.textContent = user.about;
  elements.profileAvatar.style.backgroundImage = `url('${user.avatar}')`;
};

const handleDeleteSubmit = (evt) => {
  evt.preventDefault();
  if (!cardToDelete.cardElement) return;

  deleteCard(cardToDelete.id)
    .then(() => {
      cardToDelete.cardElement.remove();
      hidePopup(elements.deleteConfirmPopup);
      cardToDelete = {};
    })
    .catch(console.error);
};

elements.deleteForm.addEventListener('submit', handleDeleteSubmit);
elements.newCardForm.addEventListener('submit', addNewCard);
elements.form.addEventListener('submit', handleProfileSubmit);
elements.closeButtons.forEach((closeButton) => {
  const popupElement = closeButton.closest('.popup');
  closeButton.addEventListener("click", () => hidePopup(popupElement));
});

function toggleLike(likeButton, { cardId, likeCount }) {
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? removeLike : addLike;
  likeMethod(cardId)
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCount.textContent = res.likes.length;
    })
    .catch(console.error);
}

Promise.all([fetchUserInfo(), fetchCards()])
  .then(([user, cards]) => {
    userId = user._id;
    refreshUserInfo(user);
    renderInitialCards(cards);
  })
  .catch(console.error);

const renderInitialCards = (cards) => {
  cards.forEach((el) => {
    elements.cardList.append(generateCard(el.name, el.link, el._id, el.owner._id, userId, el.likes, displayCardImage, confirmDeleteCard, toggleLike));
  });
};