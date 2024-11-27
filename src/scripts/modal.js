export function initializePopups() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.classList.add("popup_is-animated");
    popup.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        hidePopup(popup);
      }
    });
  });
}

export function showPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
}

export const handleEscapeKey = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    if (popup) {
      hidePopup(popup);
    }
  }
}

export function hidePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
}