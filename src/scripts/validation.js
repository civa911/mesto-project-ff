// Функция для проверки валидности поля
function checkInputValidity(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.dataset.errorMessage || inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
  } else {
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
  }
}

// Функция для управления состоянием кнопки
function toggleButtonState(formElement, buttonElement, config) {
  if (formElement.checkValidity()) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  } else {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
}

// Функция для установки слушателей на поля формы
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, buttonElement, config);
    });
  });
}

// Функция для включения валидации
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Функция для очистки ошибок валидации
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
  });

  toggleButtonState(formElement, buttonElement, config);
}