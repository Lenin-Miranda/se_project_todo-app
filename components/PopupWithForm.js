import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ selector, openBtnSelector, handleFormSubmit }) {
    super(selector, openBtnSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListener() {
    super.setEventListener();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
}

export default PopupWithForm;
