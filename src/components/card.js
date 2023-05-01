export default class Card {
  constructor(card, selector, userId, handleCardClick, handleCardDelete, handleCardLike) {
    this._selector = selector;
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._id = card._id;
    this._ownerId = card.owner._id;
    this._userId = userId;
    this._isLiked = this._likes.some((item) => item._id === this._userId);
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleCardLike(!this._isLiked, this._id);
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleCardDelete(this._id, this._element);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  changeLike(card) {
    this._likeCounter.textContent = card.likes.length;
    this._likeButton.classList.toggle('element__like-button_active');
    this._isLiked = !this._isLiked;
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();
      
    this._image = this._element.querySelector('.element__image');
    this._heading = this._element.querySelector('.element__heading');
    this._removeButton = this._element.querySelector('.element__delete-button');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-count');

    this._heading.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likeCounter.textContent = this._likes.length;
    if (this._isLiked) {
      this._likeButton.classList.add('element__like-button_active');
    }
    if (this._ownerId !== this._userId) {
      this._removeButton.remove();
    }

    return this._element
  }
}