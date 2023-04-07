import {initialCards} from './initialCards';
import {cardsContainer, cardTemplate, imagePreview, imageFigCaption, popupImagePreview} from './constants';
import {openPopup} from './modal';

// Открытие попапа с картинкой
function openImagePreview(imageUrl, figCap) {
  openPopup(popupImagePreview);
  imagePreview.src = imageUrl;
  imagePreview.alt = figCap;
  imageFigCaption.textContent = figCap;
}

// Функция создания карточек
export function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const image = cardElement.querySelector('.element__image');
  const heading = cardElement.querySelector('.element__heading');
  cardElement.querySelector('.element__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('element__like-button_active')
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });
  heading.textContent = name;
  image.src = link;
  image.alt = name;
  image.addEventListener('click', () => {
    openImagePreview(link, name)
  });
  return cardElement;
}

// Функция добавления карточек
export function addCard (name, link) {
  cardsContainer.prepend(createCard(name, link))
};

// Добавляем карточки при загрузке страницы
export function addArrayCards () {
  for (let i = 0; i < initialCards.length; i+=1) {
    addCard(initialCards[i].name, initialCards[i].link)
  }
}
