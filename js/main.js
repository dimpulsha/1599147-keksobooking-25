import { createOfferList } from './utils/create-test-data.js';
import { getTestCardFragment } from './map/map-popup.js'; // всплывающая карточка на карте
import { disableForm, enableForm, prepareOfferForm } from './form/form.js'; // работа с формой onPlaceChangeListener
// import { offerValidation } from './form/validate-form.js';

// import './map/map-config.js'; // конфигурация  для карты
// import './map/map.js'; //загрузка и инициализация карты
// import './map/map-filter.js'; // работа с фильтром карты
// import './form/check-form.js'; // проверка полей формы
// import './alert-popup.js'; // попапы для ошибок
// import './server.js'; // взаимодействие с сервером

const offerForm = document.querySelector('.ad-form');
const cardContent = document.querySelector('#card').content.querySelector('.popup');
const mapTarget = document.querySelector('#map-canvas');

[...document.forms].forEach(disableForm);

mapTarget.appendChild(getTestCardFragment(cardContent, createOfferList()));

[...document.forms].forEach(enableForm);

prepareOfferForm(offerForm);
// onPlaceChangeListener(offerForm);


// const validateOffer = new Pristine(offerForm);

// const addOfferListener = (form) => {
//   form.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     const isValid = validateOffer.validate();
//     if (isValid) {
//       console.log('valid');
//     } else {
//       console.log('noValid');
//     }
//   });
// };

// addOfferListener(offerForm);

// делаем шаблонные - элементарные проверки на основе разметки
// делаем более сложные проверки
// выносим в модуль
