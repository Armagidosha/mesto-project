import './../pages/index.css'
import {
  authorName, authorDescription, 
  popupEdit, profileEditButton, 
  submitEditForm, 
  inputName, 
  inputDescription, 
  popupAdd, 
  cardAddButton,
  headingInput,
  imageInput, 
  submitAddForm,
  addSubmitButton,
} from './constants';
import {closePopup, openPopup} from './modal';
import {addArrayCards, addCard} from './card';
import {formConst} from './utils.js';
import {enableValidation, resetValidation} from './validate';

function сloseButtonsListener () {
  document.querySelectorAll('.popup__close-button').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(buttonsPopup));
  });  
  }

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  resetValidation(popupEdit, formConst);
  inputName.value = authorName.textContent; // Убрать после полного завершения проекта 
  inputDescription.value = authorDescription.textContent; // Убрать после полного завершения проекта
});

// Открытие попапа добавления карточек
cardAddButton.addEventListener('click', () => {
  openPopup(popupAdd)
  resetValidation(popupAdd, formConst);
  submitAddForm.reset();
  addSubmitButton.disabled = true;
  addSubmitButton.classList.add('popup__save-button_disabled');
});

// Функция сабмита профиля
function submitProfile (evt) {
  evt.preventDefault();
  authorName.textContent = inputName.value;
  authorDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
}
submitEditForm.addEventListener('submit', submitProfile);

// Вешаем слушатель на форму добавления карточек
submitAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(headingInput.value, imageInput.value);
  closePopup(popupAdd);
});

addArrayCards();
enableValidation(formConst);
сloseButtonsListener();