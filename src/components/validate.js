export default class FormValidator {
  constructor({formConst}, formElement) {
    this._formConst = formConst;
    this._formElement = formElement;
    
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._formConst.inputTypeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formConst.validationError);
  };
  
  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._formConst.inputTypeError);
    errorElement.textContent = '';
    errorElement.classList.remove(this._formConst.validationError);
  };
  
  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
      inputElement.setCustomValidity('')
    };
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage) 
    } else {
      this._hideError(inputElement)
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid
    })
  }
  
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._formConst.submitButtonDisabled);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._formConst.submitButtonDisabled);
      buttonElement.disabled = false;
    }
  }
  
  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(`.${this._formConst.input}`));
    const buttonElement = this._formElement.querySelector(`.${this._formConst.submitButton}`);
    this.toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  };
  
  resetValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(`.${this._formConst.input}`));
    inputList.forEach((inputElement) => {
      _hideError(inputElement);
    });
  
  };
  
  disableButton(button) {
    button.disabled = true
    button.classList.add('popup__save-button_disabled')
  }
}