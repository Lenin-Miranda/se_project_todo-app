class FormValidator {
  constructor(settings, selector) {
    this._settings = settings;
    this._formElement = document.querySelector(selector);
    this.inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSSelector)
    );

    this.inputElement = settings.inputSelector;
    console.log(this.inputElement);
  }

  _showInputError(errorMessage) {
    this.errorElementId = `#${this.inputElement.id}-error`;

    this.errorElement = this._formElement.querySelector(this.errorElementId);
    this.inputElement.classList.add(this._settings.inputErrorClass);
    this.errorElement.textContent = errorMessage;
    this.errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError() {
    this.errorElementId = `#${this.inputElement.id}-error`;
    this.errorElement = this._formElement.querySelector(errorElementId);
    this.inputElement.classList.remove(this._settings.inputErrorClass);
    this.errorElement.classList.remove(this._settings.errorClass);
    this.errorElement.textContent = "";
  }

  _checkInputValidity() {
    if (!this.inputElement.validity.valid) {
      showInputError(
        this._formElement,
        this.inputElement,
        this.inputElement.validationMessage,
        this._settings
      );
    } else {
      hideInputError(this._formElement, inputElement, this._settings);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}

export default FormValidator;
