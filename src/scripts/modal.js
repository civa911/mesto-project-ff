document.addEventListener("DOMContentLoaded", () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => popup.classList.add("popup_is-animated"));
});

// Функция открытия модального окна
export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
  popupElement.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popupElement);
    }
  });
}

// Функция закрытия модального окна
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
}

// Функция для закрытия попапа нажатием на Esc
export const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    if (popup) {
      closePopup(popup);
    }
  }
}