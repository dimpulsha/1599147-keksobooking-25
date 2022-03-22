import {
  getPlaceKeyValue,
  getOfferPlace
} from '../config.js';
// валидация формы

const pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--error',
  // successClass: '',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error-text',
};

const roomGuestRuleSettings = new Map([
  ['1', ['1']],
  ['2', ['1', '2']],
  ['3', ['1', '2', '3']],
  ['100', ['0']]
]);

const makeCapacityPredicate = (capacity) => (configuredCapacity) => configuredCapacity === capacity;
const validateAllowedGuests = (capacities, capacity) => {
  if (!Array.isArray(capacities)) {
    throw new Error('что-то с версткой или настройками?');
  }
  return capacities.some(makeCapacityPredicate(capacity));
};

const validateRoomGuestRule = (roomCount, capacity) => validateAllowedGuests(roomGuestRuleSettings.get(roomCount), capacity);

const makeOptionReducer = (capacities) => {
  if (!Array.isArray(capacities)) {
    throw new Error('передайте массив настроек');
  }
  return (accumulator, option) => {
    if (capacities.some((capacity) => capacity === option.value)) {
      return `${accumulator} ${option.label},`;
    }
    return accumulator;
  };
};

const collectOptions = (dropDownList, capacities) => [...dropDownList.options].reduce(makeOptionReducer(capacities), '').slice(0, -1);

const getSelectedLabel = (dropDownList) => dropDownList.options[dropDownList.selectedIndex].label;

const createOfferPristineObject = (offerForm) => new Pristine(offerForm, pristineConfig, false);

const createRoomCapacityErrorTextFormatter = (room, capacity) => () => `Уточните
количество комнат
и количество гостей.
Нашими правилами разрешается:
  ${getSelectedLabel(room)} ${collectOptions(capacity, roomGuestRuleSettings.get(room.value))}`;

const createRoomCapacityValidator = (room, capacity) => () => validateRoomGuestRule(room.value, capacity.value);

const validateTypePriceRule = (type, price) => Number.isFinite(price) && getPlaceKeyValue(getOfferPlace(), 'kind', type, 'minPrice') <= price;
const createTypePriceValidator = (type, price) => () => validateTypePriceRule(type.value, Number.parseFloat(price.value));
const formatTypePriceError = (type, price) => {
  window.console.log({
    type,
    price,
    flag: validateTypePriceRule(type, price),
    message: validateTypePriceRule(type, price) ? '' : `минимальная цена для ${getPlaceKeyValue(getOfferPlace(),'kind', type, 'nameRu')} не ниже ${getPlaceKeyValue(getOfferPlace(),'kind', type, 'minPrice')}`,
    keyValue: getPlaceKeyValue(getOfferPlace(), 'kind', type, 'nameRu'),
  });
  return validateTypePriceRule(type, price) ? '' : `минимальная цена для ${getPlaceKeyValue(getOfferPlace(),'kind', type, 'nameRu')} не ниже ${getPlaceKeyValue(getOfferPlace(),'kind', type, 'minPrice')}`;
};
const createTypePriceFormatter = (type, price) => () => formatTypePriceError(type.value, Number.parseFloat(price.value));

export const getCheckedElementList = (form) => ({
  title: form.querySelector('#title'),
  type: form.querySelector('#type'),
  price: form.querySelector('#price'),
  room: form.querySelector('#room_number'),
  capacity: form.querySelector('#capacity'),
});

const createSubmitHandler = (offerPristineValidation) => (evt) => {
  if (!offerPristineValidation.validate()) {
    evt.preventDefault();
  }
};

const initRoomCapacityRule = (offerPristineValidation, room, capacity) => {
  const validateOfferCapacity = createRoomCapacityValidator(room, capacity);
  const getCapacityErrorText = createRoomCapacityErrorTextFormatter(room, capacity);

  offerPristineValidation.addValidator(capacity, validateOfferCapacity, getCapacityErrorText);
  offerPristineValidation.addValidator(room, validateOfferCapacity, getCapacityErrorText);
};

const initTypePriceRule = (offerPristineValidation, type, price) => {
  const validateTypePrice = createTypePriceValidator(type, price);
  const formatTypePrice = createTypePriceFormatter(type, price);

  offerPristineValidation.addValidator(type, validateTypePrice, formatTypePrice);
  offerPristineValidation.addValidator(price, validateTypePrice, formatTypePrice);

};

export const initOfferValidation = (form) => {

  const offerPristineValidation = createOfferPristineObject(form);
  const {
    room,
    capacity,
    price,
    type,
  } = getCheckedElementList(form);

  initRoomCapacityRule(offerPristineValidation, room, capacity);

  initTypePriceRule(offerPristineValidation, type, price);

  form.addEventListener('submit', createSubmitHandler(offerPristineValidation));

};
