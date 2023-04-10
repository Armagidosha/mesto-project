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
  authorAvatar,
  cardsContainer,
  avatar,
  popupAvatar,
  avatarButton,
  inputAvatarUrl,
  avatarForm
} from './constants';
import {closePopup, openPopup} from './modal';
import {addCard, createCard} from './card';
import {formConst} from './utils.js';
import {enableValidation, resetValidation} from './validate';
import {getUserInfo, getCards, postCards, patchUserInfo, updateAvatar} from './api';

function сloseButtonsListener () {
  document.querySelectorAll('.popup__close-button').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(buttonsPopup));
  });  
  }

const renderLoading = (isLoading, form) => {
  const button = form.querySelector('.popup__save-button')
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
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

// Открытие попапа обновления аватара 
avatar.addEventListener('click', () => {
  openPopup(popupAvatar)
  resetValidation(popupAvatar, formConst);
  avatarForm.reset();
  avatarButton.disabled = true;
  avatarButton.classList.add('popup__save-button_disabled');
})

// Функция сабмита аватара
function submitAvatar (evt) {
  evt.preventDefault();
  renderLoading(true, popupAvatar);
  updateAvatar(inputAvatarUrl.value)
  .then((res) => {
    updUserInfo(res);
    closePopup(popupAvatar);
  })
  .catch((error) => console.error(`Не удалось обновить аватар: ${error}`))
  .finally(() => renderLoading(false, popupAvatar))
}
avatarForm.addEventListener('submit', submitAvatar)

// Функция сабмита профиля
function submitProfile (evt) {
  evt.preventDefault();
  renderLoading(true, popupEdit)
  patchUserInfo({name: inputName.value, about: inputDescription.value})
  .then((res) => {
    updUserInfo(res);
    closePopup(popupEdit);
  })
  .catch((error) => console.error(`Не удалось изменить данные профиля: ${error}`))
  .finally(() => renderLoading(false, popupEdit))
}
submitEditForm.addEventListener('submit', submitProfile);

// функция сабмита карточек
const submitCards = (evt) => {
  evt.preventDefault();
  renderLoading(true, popupAdd);
  postCards({
    name: headingInput.value,
    url: imageInput.value
  })
  .then((card) => {
    cardsContainer.append(createCard(card))
    closePopup(popupAdd);
  })
  .catch((error) => console.error(`Не удалось отправить карточку: ${error}`))
  .finally(() => renderLoading(false, popupAdd))
}
submitAddForm.addEventListener('submit', submitCards)
// 
// addArrayCards();
enableValidation(formConst);
сloseButtonsListener();

// 
// 
// 
// A P I
// 
// 
// 

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '51223542-913b-4f70-95e2-80679cf69654',
    'Content-Type': 'application/json'
  }
}

export const getId = () => {
  return id;
}

let id = 0

// Обновляем информацию на клиентской части
const updUserInfo = ({name, about, avatar, _id}) => {
  authorName.textContent = name;
  authorDescription.textContent = about
  authorAvatar.style.backgroundImage = `url(${avatar})`;
  id = _id
}

Promise.all([getUserInfo(), getCards()])
.then(([userInfo, cards]) => {
  updUserInfo(userInfo);
  addCard(cards)
})
.catch((error) => console.error(error))