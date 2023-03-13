// Constants
const cardTemplate = document.querySelector('#card-Template').content;
const authorName = document.querySelector('.profile__author');
const authorDescription = document.querySelector('.profile__description');
const cardsContainer = document.querySelector('.elements__list');
// Popup Image
const popupImagePreview = document.querySelector('.popup_type_preview');
const imagePreview = document.querySelector('.popup__image');
const imageFigCaption = document.querySelector('.popup__figcaption');
// Popup edit 
const popupEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const submitEditForm = popupEdit.querySelector('.popup__form')
const inputName = popupEdit.querySelector('.popup__input_type_name');
const inputDescription = popupEdit.querySelector('.popup__input_type_description');
// Popup add 
const popupAdd = document.querySelector('.popup_type_add');
const cardAddButton = document.querySelector('.profile__add-button');
const submitAddForm = popupAdd.querySelector('.popup__form')
// Popup open / close functions
function openPopup (popup) {
  popup.classList.add('popup_opened');
}
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}
// Popup open button
profileEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  inputName.value = authorName.textContent; // Убрать после полного завершения проекта 
  inputDescription.value = authorDescription.textContent; // Убрать после полного завершения проекта
});
cardAddButton.addEventListener('click', () => {
  openPopup(popupAdd)
  headingInput.value = '';
  imageInput.value = '';
});
// Popup close butons
document.querySelectorAll('.popup__close-button').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});  
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
  openPopup(popupImagePreview);
  imagePreview.src = imageUrl;
  imagePreview.alt = figCap;
  imageFigCaption.textContent = figCap;
}
//  Create card function
const headingInput = document.querySelector('.popup__input_type_card-heading');
const imageInput = document.querySelector('.popup__input_type_card-url');

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
// Add card Funcion
function addCard (name, link) {
  cardsContainer.prepend(createCard(name, link))
};
// Card submit button
submitAddForm.addEventListener('submit', () => {
  addCard(headingInput.value, imageInput.value);
});
// Auto-add cards on page load 
function addArrayCards () {
for (let i = 0; i < initialCards.length; i+=1) {
  addCard(initialCards[i].name, initialCards[i].link)
  }
}
addArrayCards()
