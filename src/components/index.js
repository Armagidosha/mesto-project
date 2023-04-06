import './../pages/index.css'
import {cardTemplate, 
  authorName, authorDescription, 
  cardsContainer, 
  popupImagePreview, 
  imagePreview, 
  imageFigCaption, 
  popupEdit, profileEditButton, 
  submitEditForm, 
  inputName, 
  inputDescription, 
  popupAdd, 
  cardAddButton,
  headingInput,
  imageInput, 
  submitAddForm,
} from './constants';
import {closePopup, openPopup} from './modal';
import {initialCards} from './initialCards';
import {formConst} from './utils.js';
import {enableValidation} from './validate';

function CloseButtonsListener () {
  document.querySelectorAll('.popup__close-button').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(buttonsPopup));
  });  
  }

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  inputName.value = authorName.textContent; // Убрать после полного завершения проекта 
  inputDescription.value = authorDescription.textContent; // Убрать после полного завершения проекта
});

// Открытие попапа добавления карточек
cardAddButton.addEventListener('click', () => {
  openPopup(popupAdd)
  headingInput.value = '';
  imageInput.value = '';
});

// Функция сабмита профиля
function submitProfile (evt) {
  evt.preventDefault();
  authorName.textContent = inputName.value;
  authorDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
}
submitEditForm.addEventListener('submit', submitProfile);

// Открытие попапа с картинкой
function openImagePreview(imageUrl, figCap) {
  openPopup(popupImagePreview);
  imagePreview.src = imageUrl;
  imagePreview.alt = figCap;
  imageFigCaption.textContent = figCap;
}

// Функция создания карточек
function createCard(name, link) {
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
  closePopup(popupAdd);
  return cardElement;
}

// Функция добавления карточек
function addCard (name, link) {
  cardsContainer.prepend(createCard(name, link))
};

// Вешаем слушатель на форму добавления карточек
submitAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(headingInput.value, imageInput.value);
});

// Добавляем карточки при загрузке страницы
function addArrayCards () {
  for (let i = 0; i < initialCards.length; i+=1) {
    addCard(initialCards[i].name, initialCards[i].link)
  }
}
addArrayCards();
enableValidation(formConst);
CloseButtonsListener();




