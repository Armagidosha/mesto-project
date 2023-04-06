import {popupList} from "./constants";
import {resetValidation} from "./validate";
import {formConst} from "./utils";

// Открытие попапа
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  closePopupByEscape(popup);
  resetValidation(popup, formConst);
};

// Закрытие попапа
export function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape)
}

// Вешаем обработчик на открытый нами попап, который позваляет закрывать его по нажатию на Esc
function closePopupByEscape (popup) {
  document.addEventListener('keyup', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup)
    }
  })
};

// Проверяем является ли элемент на который мы кликаем "Попапом", если да, то вызывает функцию закрытия
popupList.forEach(element => (
  element.addEventListener('click', (evt) => {
    if (evt.target === element) {
      closePopup(element);
    }
  })
));