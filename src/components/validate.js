const showError = (formElement, inputElement, errorMessage, formConst) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.add(formConst.inputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formConst.validationError);
};

const hideError = (formElement, inputElement, formConst) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.remove(formConst.inputTypeError);
  errorElement.textContent = '';
  errorElement.classList.remove(formConst.validationError);
};

const isValid = (formElement, inputElement, formConst) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  };
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, formConst) 
  } else {
    hideError(formElement, inputElement, formConst)
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, formConst) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formConst.submitButtonDisabled);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formConst.submitButtonDisabled);
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, formConst) => {
  const inputList = Array.from(formElement.querySelectorAll(`.${formConst.input}`));
  const buttonElement = formElement.querySelector(`.${formConst.submitButton}`);
  toggleButtonState(inputList, buttonElement, formConst);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, formConst);
      toggleButtonState(inputList, buttonElement, formConst);
    })
  })
};

export const enableValidation = (formConst) => {
  const formList = Array.from(document.querySelectorAll(`.${formConst.form}`));
  formList.forEach((formElement) => {
    setEventListeners(formElement, formConst)
  })
};

// Очистка полей от ошибок при повторном открытии попапа
export const resetValidation = (formElement, formConst) => {
  const inputList = Array.from(formElement.querySelectorAll(`.${formConst.input}`));
  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, formConst);
  });

};