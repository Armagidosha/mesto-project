export default class UserInfo {
	constructor(data) {
		this._name = data.name;
		this._description = data.description;
		this._avatar = data.avatar;
	}

	getUserInfo() {
		return {
			name: this._name.textContent,
			description: this._description.textContent
		}
	}

	setUserInfo(data) {
		this._name.textContent = data.name;
		this._description.textContent = data.about;
		this._avatar.style.backgroundImage = `url(${data.avatar})`;
	}
}