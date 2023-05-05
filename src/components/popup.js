export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  
  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };
  
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  setEventListeners() {
    this._button = this._popup.querySelector('.popup__close-button');
    this._button.addEventListener('click', this.closePopup.bind(this))
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === this._popup) {
        this.closePopup()
      }
    })
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
  }
  }
}