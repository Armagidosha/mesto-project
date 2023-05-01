export default class FormValidator {
  constructor(formConst, formElement) {
    this._formConst = formConst;
    this._formElement = formElement;
    this._inputList = formElement.querySelectorAll(`.${formConst.input}`);
    this._button = formElement.querySelector(`.${formConst.submitButton}`);
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

  _hasInvalidInput() {
    return Array.from(this._inputList).some(inputElement => {
      return !inputElement.validity.valid
    })
  };
  
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._formConst.submitButtonDisabled);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._formConst.submitButtonDisabled);
      this._button.disabled = false;
    }
  };
  
  enableValidation() {
    this._toggleButtonState();
    Array.from(this._inputList).forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    })
  };
  
  resetValidation() {
    Array.from(this._inputList).forEach((inputElement) => {
      this._hideError(inputElement);
    });
  };
  
  disableButton() {
    this._button.disabled = true
    this._button.classList.add(this._formConst.submitButtonDisabled)
  };
}