import Popup from "./Popup";
import { imagePreview, imageFigCaption } from "./constants";

export default class PopupWithImage extends Popup {
	constructor(popup, data) {
		super(popup);
		this._data = data;
	}

	openPopup() {
		super.openPopup();
		imagePreview.src = this._data.link;
  		imagePreview.alt = this._data.name;
  		imageFigCaption.textContent = this._data.name;
	}
}