import './../pages/index.css'
import {
  authorName, authorDescription, 
  popupEdit, profileEditButton, 
  inputName, 
  inputDescription, 
  popupAdd, 
  cardAddButton,
  addSubmitButton,
  authorAvatar,
  cardsContainer,
  avatar,
  popupAvatar,
  avatarButton,
  popupImagePreview,
  imagePreview,
  imageFigCaption
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

export const api = new Api(config);
const userInfo = new UserInfo({
  name: authorName,
  description: authorDescription,
  avatar: authorAvatar
});
// Открытие попапа редактирования профиля
const editProfileValidate = new FormValidator(formConst, popupEdit)
editProfileValidate.enableValidation()
profileEditButton.addEventListener('click', () => {
  profileInstance.openPopup();
  editProfileValidate.resetValidation()
  inputName.value = userInfo.getUserInfo().name; // Убрать после полного завершения проекта 
  inputDescription.value = userInfo.getUserInfo().description; // Убрать после полного завершения проекта
});

// Открытие попапа добавления карточек
const cardAddValidate = new FormValidator(formConst, popupAdd)
cardAddValidate.enableValidation()
cardAddButton.addEventListener('click', () => {
  cardInstance.openPopup();
  cardAddValidate.resetValidation()
  cardAddValidate.disableButton()
});



// Открытие попапа обновления аватара 
const avatarValidate = new FormValidator(formConst, popupAvatar)
avatarValidate.enableValidation()
avatar.addEventListener('click', () => {
  avatarInstance.openPopup()
  avatarValidate.resetValidation()
  avatarValidate.disableButton()
});

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
    cardsContainer.prepend(new Card(card, '#card-Template', userId.id, handleCardClick, handleCardDelete, handleCardLike).generate());
    cardInstance.closePopup()
  })
  .catch((error) => console.error(`Не удалось отправить карточку: ${error}`))
  .finally(() => renderLoading(false, popupAdd))
})

avatarInstance.setEventListeners()
profileInstance.setEventListeners();
cardInstance.setEventListeners();

const userId = {
  id: 0
};

Promise.all([api.getUserInfo(), api.getCards()])
.then(([userData, cards]) => {
  userId.id = userData._id;
  userInfo.setUserInfo(userData);
  const cardList = new Section({
    items: cards,
    renderer: (item) => {
      const cardElement = new Card(item, '#card-Template', userId.id, handleCardClick, handleCardDelete, handleCardLike).generate();
      cardList.addItem(cardElement);
    }
  }, cardsContainer);
  cardList.renderItems();
})
.catch((error) => console.error(error))


const popupWithImage = new PopupWithImage(popupImagePreview);
popupWithImage.setEventListeners();

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

