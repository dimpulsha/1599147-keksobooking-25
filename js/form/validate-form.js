import { getCheckedElementList } from './form.js';
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
  ['1',['1']],
  ['2',['1','2']],
  ['3',['1','2','3']],
  ['100', ['0']]
]);

const makeCapacityPredicate = (capacity)=>(configuredCapacity)=>configuredCapacity===capacity;
const validateAllowedGuests = (capacities, capacity)=>{
  if(!Array.isArray(capacities)){
    throw new Error('что-то с версткой или настройками?');
  }
  return capacities.some(makeCapacityPredicate(capacity));
};

const validateRoomGuestRule = (roomCount, capacity)=>validateAllowedGuests(roomGuestRuleSettings.get(roomCount), capacity);

const makeOptionReducer = (capacities)=>{
  if(!Array.isArray(capacities)){
    throw new Error('передайте массив настроек');
  }
  return (accumulator, option)=>{
    if(capacities.some((capacity)=>capacity===option.value)){
      return `${accumulator} ${option.label},`;
    }
    return accumulator;
  };};

const collectOptions = (dropDownList, capacities)=> [...dropDownList.options].reduce(makeOptionReducer(capacities),'').slice(0,-1);

const createOfferPristineObject = (offerForm) => new Pristine(offerForm, pristineConfig);

const offerValidation = (form, offerPristineValidation) => {

  const {room,capacity} = getCheckedElementList(form);


  const validateOfferCapacity = () => validateRoomGuestRule(room.value, capacity.value);
  const getCapacityErrorText = () => `Уточните
  количество комнат
  и количество гостей.
  Нашими правилами разрешается:
    ${room.options[room.selectedIndex].label} ${collectOptions(capacity, roomGuestRuleSettings.get(room.value))}`;

  offerPristineValidation.addValidator(capacity, validateOfferCapacity, getCapacityErrorText);
  offerPristineValidation.addValidator(room, validateOfferCapacity, getCapacityErrorText);

  //листинер для валидации
  const handleSubmit = (evt) => {
    if (!offerPristineValidation.validate()) {
      evt.preventDefault();
    }
  };

  form.addEventListener('submit', handleSubmit);
};

export { offerValidation, createOfferPristineObject};
