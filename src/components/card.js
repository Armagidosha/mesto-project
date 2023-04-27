import {cardsContainer, cardTemplate, imagePreview, imageFigCaption, popupImagePreview} from './constants';
import {openPopup} from './modal';
import {getId} from './index.js';
import {api} from './api';

// // Открытие попапа с картинкой
// function openImagePreview(imageUrl, figCap) {
//   openPopup(popupImagePreview);
//   imagePreview.src = imageUrl;
//   imagePreview.alt = figCap;
//   imageFigCaption.textContent = figCap;
// }

// export const showLikeCount = (likes, cardElement, userId) => {
//   const likeButton = cardElement.querySelector('.element__like-button');
//   const likeCounter = cardElement.querySelector('.element__like-count');

//   likeCounter.textContent = `${likes.length}`;
//   const isLike = likes.some((item) => item._id === userId);
//   likeButton.classList.toggle('element__like-button_active', isLike);
// }

// // Функция создания карточек
// export function createCard({name, link, likes, _id, owner}) {
//   const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
//   const image = cardElement.querySelector('.element__image');
//   const heading = cardElement.querySelector('.element__heading');
//   const removeButton = cardElement.querySelector('.element__delete-button');
//   const userId = getId();
//   cardElement.querySelector('.element__like-button').addEventListener('click', () => {
//     updLikes(_id, userId, cardElement);
//   });
//   cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
//     api.deleteCard(_id)
//     .then (() => {
//       cardElement.remove()
//     })
//     .catch((error) => console.error(error))
//   });
//   heading.textContent = name;
//   image.src = link;
//   image.alt = name;

//   if (owner._id !== userId) {
//     removeButton.remove()
//   }

//   showLikeCount(likes, cardElement, userId)

//   image.addEventListener('click', () => {
//     openImagePreview(link, name)
//   });
//   return cardElement;
// }

// Функция добавления карточек
export const addCard = (cards) => {
  cards.forEach((element) => {
    console.log(element);
    cardsContainer.append(new Card(element, '#card-Template').generate())
  })
};

export class Card {
  constructor(card, selector) {
    this._selector = selector;
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._id = card._id;
    this._ownerId = card.owner._id;
    this._userId = getId();
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._updLikes();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      api.deleteCard(this._id)
      .then (() => {
        this._element.remove()
      })
      .catch((error) => console.error(error))
    });
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    const image = this._element.querySelector('.element__image');
    const heading = this._element.querySelector('.element__heading');
    const removeButton = this._element.querySelector('.element__delete-button');
    heading.textContent = this._name;
    image.src = this._link;
    image.alt = this._name;
    this._showLikeCount();
    if (this._ownerId !== this._userId) {
      removeButton.remove()
    }

    return this._element
  }

  _updLikes() {
    const likeButton = this._element.querySelector('.element__like-button');
    const like = likeButton.classList.contains('element__like-button_active');
    api.updateLikes(!like, this._id)
    .then((card) => {
      this._likes = card.likes;
      this._showLikeCount();
    })
    .catch((error) => console.error(error))
  }

  _showLikeCount() {
    const likeButton = this._element.querySelector('.element__like-button');
    const likeCounter = this._element.querySelector('.element__like-count');
  
    likeCounter.textContent = `${this._likes.length}`;
    const isLike = this._likes.some((item) => item._id === this._userId);
    likeButton.classList.toggle('element__like-button_active', isLike);
  }

}
