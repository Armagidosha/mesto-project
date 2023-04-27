import {cardsContainer, cardTemplate, imagePreview, imageFigCaption, popupImagePreview} from './constants';
import {openPopup} from './modal';
import {getId, updLikes} from './index.js';
import {api} from './api';

// Открытие попапа с картинкой
function openImagePreview(imageUrl, figCap) {
  openPopup(popupImagePreview);
  imagePreview.src = imageUrl;
  imagePreview.alt = figCap;
  imageFigCaption.textContent = figCap;
}

export const showLikeCount = (likes, cardElement, userId) => {
  const likeButton = cardElement.querySelector('.element__like-button');
  const likeCounter = cardElement.querySelector('.element__like-count');

  likeCounter.textContent = `${likes.length}`;
  const isLike = likes.some((item) => item._id === userId);
  likeButton.classList.toggle('element__like-button_active', isLike);
}

// Функция создания карточек
export function createCard({name, link, likes, _id, owner}) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const image = cardElement.querySelector('.element__image');
  const heading = cardElement.querySelector('.element__heading');
  const removeButton = cardElement.querySelector('.element__delete-button')
  const userId = getId();
  cardElement.querySelector('.element__like-button').addEventListener('click', () => {
    updLikes(_id, userId, cardElement);
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
    api.deleteCard(_id)
    .then (() => {
      cardElement.remove()
    })
    .catch((error) => console.error(error))
  });
  heading.textContent = name;
  image.src = link;
  image.alt = name;

  if (owner._id !== userId) {
    removeButton.remove()
  }

  showLikeCount(likes, cardElement, userId)

  image.addEventListener('click', () => {
    openImagePreview(link, name)
  });
  return cardElement;
}

// Функция добавления карточек
export const addCard = (cards) => {
  cards.forEach((element) => {
    cardsContainer.append(createCard(element))
  })
};