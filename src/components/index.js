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
import Popup from './Popup';
import {Card} from './card';
import {formConst} from './utils.js';
import FormValidator from './validate';
import {api} from './api';
import Section from './section';

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
  const editProfileValidate = new FormValidator(formConst, popupEdit)
  editProfileValidate.enableValidation()
  editProfileValidate.resetValidation()
  inputName.value = authorName.textContent; // Убрать после полного завершения проекта 
  inputDescription.value = authorDescription.textContent; // Убрать после полного завершения проекта
});

// Открытие попапа добавления карточек
cardAddButton.addEventListener('click', () => {
  openPopup(popupAdd)
  const cardAddValidate = new FormValidator(formConst, popupAdd)
  cardAddValidate.enableValidation()
  cardAddValidate.resetValidation()
  cardAddValidate.disableButton(addSubmitButton)
  submitAddForm.reset();
});

// Открытие попапа обновления аватара 
avatar.addEventListener('click', () => {
  openPopup(popupAvatar)
  const avatarValidate = new FormValidator(formConst, popupAvatar)
  avatarValidate.enableValidation()
  avatarValidate.resetValidation()
  avatarValidate.disableButton(avatarButton)
  avatarForm.reset();
});

// Функция сабмита аватара
function submitAvatar (evt) {
  evt.preventDefault();
  renderLoading(true, popupAvatar);
  api.updateAvatar(inputAvatarUrl.value)
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
  api.patchUserInfo({name: inputName.value, about: inputDescription.value})
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
  api.postCards({
    name: headingInput.value,
    url: imageInput.value
  })
  .then((card) => {
    cardsContainer.prepend(new Card(card, '#card-Template').generate());
    closePopup(popupAdd);
  })
  .catch((error) => console.error(`Не удалось отправить карточку: ${error}`))
  .finally(() => renderLoading(false, popupAdd))
}
submitAddForm.addEventListener('submit', submitCards)
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