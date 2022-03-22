// //модуль работы с формой
import { getOfferPlace, getObjItemByValue } from '../config.js';
import { initOfferValidation, getCheckedElementList } from './validate-form.js';

const placeList = getOfferPlace();

// const disableElementList = (elementList) => {
//   Object.values(elementList).forEach((element) => element.setAttribute('disabled', ''));
// };

// const enableElementList = (elementList) => {
//   Object.values(elementList).forEach((element) => element.removeAttribute('disabled'));
// };

// const getFormElementList = (form) => {
//   // const elementList = form.querySelectorAll('fieldset, select');
//   const elementList = form.elements;
//   return elementList;
// };

const disableElement = (element) => element.setAttribute('disabled', '');
const enableElement  = (element)=>element.removeAttribute('disabled');


const disableForm = (form) => {
  // form.classList.add('ad-form--disabled');
  // const formElementList = getFormElementList(form);
  // disableElementList(formElementList);
  [...form.elements].forEach(disableElement);
};

const enableForm = (form) => {
  // form.classList.remove('ad-form--disabled');
  // const formElementList = getFormElementList(form);
  // enableElementList(formElementList);
  [...form.elements].forEach(enableElement);
};

const prepareOfferForm = (offerForm) => {

  const {price, type} = getCheckedElementList(offerForm);

  initOfferValidation(offerForm);

  const onPlaceChange = () => {
    price.placeholder = getObjItemByValue(placeList, 'kind',type.value).minPrice;
  };

  type.addEventListener('change', onPlaceChange);
  onPlaceChange();

};

export { disableForm, enableForm, prepareOfferForm };
