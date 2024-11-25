document.addEventListener("DOMContentLoaded", () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => popup.classList.add("popup_is-animated"));
});

// Функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

// Функция закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// Функция для закрытия попапа нажатием на Esc
export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Функция закрытия попапа кликом на оверлей
export function closePopupOnOverlayClick(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}