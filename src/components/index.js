import './../pages/index.css'
import {
  authorName, authorDescription, 
  popupEdit, profileEditButton, 
  inputName, 
  inputDescription, 
  popupAdd, 
  cardAddButton,
  authorAvatar,
  cardsContainer,
  avatar,
  popupAvatar,
  popupImagePreview
} from '../utils/constants.js';
import Card from './card';
import { formConst, config } from '../utils/utils';
import FormValidator from './validate';
import Api from './api';
import Section from './section';
import PopupWithForm from './PopupWithForm';
import UserInfo from './UserInfo';
import PopupWithImage from './popupWithImage';

const renderLoading = (isLoading, form) => {
  const button = form.querySelector('.popup__save-button')
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

// Создаём экземпляры классов Api
export const api = new Api(config);
const userInfo = new UserInfo({
  name: authorName,
  description: authorDescription,
  avatar: authorAvatar
});

const editProfileValidate = new FormValidator(formConst, popupEdit)
const cardAddValidate = new FormValidator(formConst, popupAdd)
const avatarValidate = new FormValidator(formConst, popupAvatar)
const popupWithImage = new PopupWithImage(popupImagePreview);

const avatarInstance = new PopupWithForm(popupAvatar, (inputs) => {
  renderLoading(true, popupAvatar);
  api.updateAvatar(inputs.avatar)
  .then((res) => {
    userInfo.setUserInfo(res);
    avatarInstance.closePopup();
  })
  .catch((error) => console.error(`Не удалось обновить аватар: ${error}`))
  .finally(() => renderLoading(false, popupAvatar))
})

const profileInstance = new PopupWithForm(popupEdit, (inputs) => {
  renderLoading(true, popupEdit)
  api.patchUserInfo({
    name: inputs.user, 
    about: inputs.description
  })
  .then((res) => {
    userInfo.setUserInfo(res);
    profileInstance.closePopup();
  })
  .catch((error) => console.error(`Не удалось изменить данные профиля: ${error}`))
  .finally(() => renderLoading(false, popupEdit))
})

const cardInstance = new PopupWithForm(popupAdd, (inputs) => {
  renderLoading(true, popupAdd);
  api.postCards({
    name: inputs.user,
    url: inputs.description 
  })
  .then((card) => {
    cardList.prependItem(createCard(card));
    cardInstance.closePopup()
  })
  .catch((error) => console.error(`Не удалось отправить карточку: ${error}`))
  .finally(() => renderLoading(false, popupAdd))
})

// Вешаем обработчики
editProfileValidate.enableValidation()
profileEditButton.addEventListener('click', () => {
  profileInstance.openPopup();
  editProfileValidate.resetValidation()
  inputName.value = userInfo.getUserInfo().name; // Убрать после полного завершения проекта 
  inputDescription.value = userInfo.getUserInfo().description; // Убрать после полного завершения проекта
});

cardAddValidate.enableValidation()
cardAddButton.addEventListener('click', () => {
  cardInstance.openPopup();
  cardAddValidate.resetValidation()
  cardAddValidate.disableButton()
});

avatarValidate.enableValidation()
avatar.addEventListener('click', () => {
  avatarInstance.openPopup()
  avatarValidate.resetValidation()
  avatarValidate.disableButton()
});

avatarInstance.setEventListeners()
profileInstance.setEventListeners();
cardInstance.setEventListeners();
popupWithImage.setEventListeners();
// --
const userId = {
  id: 0
};

function createCard(card) {
  return new Card(card, '#card-Template', userId.id, handleCardClick, handleCardDelete, handleCardLike).generate();
}

function handleCardClick() {
  popupWithImage.openPopup({name: this._name, link: this._link})
}

function handleCardDelete() {
  api.deleteCard(this._id)
       .then (() => {
         this._element.remove()
       })
       .catch((error) => console.error(error))
}

function handleCardLike() {
  api.updateLikes(!this._isLiked, this._id)
     .then((card) => {
       this._likeCounter.textContent = card.likes.length;
       this._likeButton.classList.toggle('element__like-button_active');
       this._isLiked = !this._isLiked;
     })
     .catch((error) => console.error(error))
}

let cardList;

Promise.all([api.getUserInfo(), api.getCards()])
.then(([userData, cards]) => {
  userId.id = userData._id;
  userInfo.setUserInfo(userData);
  cardList = new Section({
    items: cards,
    renderer: (item) => {
      cardList.appendItem(createCard(item));
    }
  }, cardsContainer);
  cardList.renderItems();
})
.catch((error) => console.error(error))