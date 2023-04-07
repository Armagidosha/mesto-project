import {popupList} from "./constants";

// Открытие попапа
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

// Закрытие попапа
export function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

// Вешаем обработчик на открытый нами попап, который позваляет закрывать его по нажатию на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Проверяем является ли элемент на который мы кликаем "Попапом", если да, то вызывает функцию закрытия
popupList.forEach(element => (
  element.addEventListener('click', (evt) => {
    if (evt.target === element) {
      closePopup(element);
    }
  })
));