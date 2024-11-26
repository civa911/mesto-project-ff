function checkInputValidity(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.dataset.errorMessage || inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
  } else {
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
  }
}

function addInputListeners(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, submitButton, config);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputs, submitButton, config);
    });
  });
}

export function activateValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formElement) => {
    addInputListeners(formElement, config);
  });
}

const hideError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputs, buttonElement, config) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

export const resetValidation = (formElement, config) => {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputs.forEach((inputElement) => {
    hideError(formElement, inputElement, config);
  });
};

const showError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};