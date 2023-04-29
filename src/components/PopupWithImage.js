import Popup from "./Popup";

export default class PopupWithImage extends Popup {
	constructor(popup) {
		super(popup);
	}

	openPopup(data) {
		super.openPopup();
		this._imagePreview = this._popup.querySelector('.popup__image');
		this._imageFigCaption = this._popup.querySelector('.popup__figcaption');

		this._imagePreview.src = data.link;
		this._imagePreview.alt = data.name;
		this._imageFigCaption.textContent = data.name;
	}
}