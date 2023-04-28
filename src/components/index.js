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
} from './constants';
import {Card} from './card';
import {formConst} from './utils.js';
import FormValidator from './validate';
import {api} from './api';
import Section from './section';
import PopupWithForm from './PopupWithForm';

const renderLoading = (isLoading, form) => {
  const button = form.querySelector('.popup__save-button')
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

// Открытие попапа редактирования профиля
const editProfileValidate = new FormValidator(formConst, popupEdit)
profileEditButton.addEventListener('click', () => {
  profileInstance.openPopup();
  profileInstance.setEventListeners();
  editProfileValidate.enableValidation()
  editProfileValidate.resetValidation()
  inputName.value = authorName.textContent; // Убрать после полного завершения проекта 
  inputDescription.value = authorDescription.textContent; // Убрать после полного завершения проекта
});

// Открытие попапа добавления карточек
const cardAddValidate = new FormValidator(formConst, popupAdd)
cardAddButton.addEventListener('click', () => {
  cardInstance.setEventListeners()
  cardInstance.openPopup();
  cardAddValidate.enableValidation()
  cardAddValidate.resetValidation()
  cardAddValidate.disableButton(addSubmitButton)
});

// Открытие попапа обновления аватара 
const avatarValidate = new FormValidator(formConst, popupAvatar)
avatar.addEventListener('click', () => {
  avatarInstance.setEventListeners()
  avatarInstance.openPopup()
  avatarValidate.enableValidation()
  avatarValidate.resetValidation()
  avatarValidate.disableButton(avatarButton)
});

const avatarInstance = new PopupWithForm(popupAvatar, (inputs) => {
  renderLoading(true, popupAvatar);
  api.updateAvatar(inputs.avatar)
  .then((res) => {
    updUserInfo(res);
    avatarInstance.closePopup();
  })
  .catch((error) => console.error(`Не удалось обновить аватар: ${error}`))
  .finally(() => renderLoading(false, popupAvatar))
})

const profileInstance = new PopupWithForm(popupEdit, (inputs) => {
  console.log(inputs)
  renderLoading(true, popupEdit)
  api.patchUserInfo({
    name: inputs.user, 
    about: inputs.description
  })
  .then((res) => {
    updUserInfo(res);
    profileInstance.closePopup();
    console.log(res)
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
    cardsContainer.prepend(new Card(card, '#card-Template').generate());
    cardInstance.closePopup()
  })
  .catch((error) => console.error(`Не удалось отправить карточку: ${error}`))
  .finally(() => renderLoading(false, popupAdd))
})

// 
// A P I
//

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

Promise.all([api.getUserInfo(), api.getCards()])
.then(([userInfo, cards]) => {
  updUserInfo(userInfo);
  const cardList = new Section({
    items: cards,
    renderer: (item) => {
      const cardElement = new Card(item, '#card-Template').generate();
      cardList.addItem(cardElement);
    }
  }, cardsContainer);
  cardList.renderItems();
})
.catch((error) => console.error(error))