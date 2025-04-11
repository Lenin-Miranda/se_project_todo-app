class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    this.popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this.popupOpenBtn = document.querySelector(".button_action_add");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", (evt) => this._handleEscClose(evt));
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
  }

  setEventListener() {
    this.popupCloseBtn.addEventListener("click", () => {
      this.close();
    });

    this.popupOpenBtn.addEventListener("click", () => {
      this.open();
    });
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}

export default Popup;
