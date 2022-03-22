// //модуль работы с формой
import {
  getOfferPlace,
  getObjItemByValue
} from '../config.js';
import {
  initOfferValidation,
  getCheckedElementList
} from './validate-form.js';

const INITIAL_SELECTED_ROOM_COUNT = '1';
const INITIAL_SELECTED_CAPACITY = '1';

const placeList = getOfferPlace();

const disableElement = (element) => element.setAttribute('disabled', '');

const enableElement = (element) => element.removeAttribute('disabled');

export const disableForm = (form) => {
  // form.classList.add('ad-form--disabled');
  // const formElementList = getFormElementList(form);
  // disableElementList(formElementList);
  [...form.elements].forEach(disableElement);
};

export const enableForm = (form) => {
  // form.classList.remove('ad-form--disabled');
  // const formElementList = getFormElementList(form);
  // enableElementList(formElementList);
  [...form.elements].forEach(enableElement);
};

const onPlaceChange = (price, type) => {
  const min = getObjItemByValue(placeList, 'kind', type.value).minPrice;
  price.placeholder = min;
};
const initSelectedOne = (dropDownList, value) => {
  dropDownList.value = value;
};

export const prepareOfferForm = (offerForm) => {

  const {
    price,
    type,
    room,
    capacity
  } = getCheckedElementList(offerForm);

  initOfferValidation(offerForm);

  type.addEventListener('change', () => onPlaceChange(price, type));

  onPlaceChange(price, type);
  initSelectedOne(room, INITIAL_SELECTED_ROOM_COUNT);
  initSelectedOne(capacity, INITIAL_SELECTED_CAPACITY);
};
