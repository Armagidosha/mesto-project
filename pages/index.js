// Constants
const authorName = document.querySelector('.profile__author');
const authorDescription = document.querySelector('.profile__description');
const cardsList = document.querySelector('.elements__list');
// Popup Image
const popupImagePreview = document.querySelector('.popup_image_preview');
const popupImageCloseButton = document.querySelector('.popup__close-button');
// Popup edit 
const popupEdit = document.querySelector('.popup_profile_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const submitEditForm = popupEdit.querySelector('.popup__form')
const inputName = popupEdit.querySelector('.popup__input_type_name');
const inputDescription = popupEdit.querySelector('.popup__input_type_description');
// Popup add 
const popupAdd = document.querySelector('.popup_card_add');
const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const submitAddForm = popupAdd.querySelector('.popup__form')
// Popup open / close functions
function openPopup (popup) {
  popup.classList.add('popup_opened');
}
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}
// Popup's Open / close 
profileEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  inputName.value = authorName.textContent; // Убрать после полного завершения проекта 
  inputDescription.value = authorDescription.textContent; // Убрать после полного завершения проекта
});
popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit)
});
cardAddButton.addEventListener('click', () => {
  openPopup(popupAdd)
});
popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAdd)
});
popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImagePreview);
})
// Submit profile button
function submitProfile (evt) {
  evt.preventDefault();
  authorName.textContent = inputName.value;
  authorDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
}
submitEditForm.addEventListener('submit', submitProfile);
// Image Popup Open 
function openImagePreview(imageUrl, figCap) {
  const imagePreview = document.querySelector('.popup__image');
  const imageFigCaption = document.querySelector('.popup__figcaption');
  openPopup(popupImagePreview);
  imagePreview.src = imageUrl;
  imagePreview.alt = figCap;
  imageFigCaption.textContent = figCap;
}
//  Add Cards function
const headingInput = document.querySelector('.popup__input_type_card-heading');
const imageInput = document.querySelector('.popup__input_type_card-url');

function addCard(name, link) {
  const cardTemplate = document.querySelector('#card-Template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const image = cardElement.querySelector('.element__image');
  const heading = cardElement.querySelector('.element__heading');
  cardElement.querySelector('.element__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('element__like-button_active')
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });
  cardsList.prepend(cardElement);
  heading.textContent = name;
  image.src = link;
  image.alt = name;
  image.addEventListener('click', () => {
    openImagePreview(link, name)
  });
  headingInput.value = '',
  imageInput.value = '',
  closePopup(popupAdd);
  console.log('Card Created ' + name);
}
// Card submit button
submitAddForm.addEventListener('submit', () => {
  addCard(headingInput.value, imageInput.value);
});
// 
const initialCards = [
  {
    name: 'Канада, озеро Морейн',
    link: 'https://co19.nevseoboi.com.ua/mountains/331/33123/1562510903-1005339-mountains-nevseoboi.com.ua.jpg'
  },
  {
    name: 'Байкал, остров Ольхон',
    link: 'https://images.unsplash.com/photo-1676466920684-5d1aae90c9c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Италия, Моэна',
    link: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'США, Чикаго',
    link: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Ёжик, еловый лес',
    link: 'https://images.unsplash.com/photo-1622227056993-6e7f88420855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Канада, Ниагарский водопад',
    link: 'https://images.unsplash.com/photo-1511358146320-eb018ab3e22e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  }
]; 
// Auto-add cards on page load 
function dataAddCards () {
for (let i = 0; i < initialCards.length; i+=1) {
  addCard(initialCards[i].name, initialCards[i].link)
  }
}
dataAddCards()
