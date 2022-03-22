// константы и служебные массивы
const OFFER_TITLE_LIST = [
  'Для работы и отдыха',
  'Помещение с прекрасным видом',
  'Дешево в двух шпагах от метро',
  'Идеально для молодых',
  'Тем, кто путешествует с детьми',
  'Дешево и уютно',
  'Апартаменты с максимумом удобств',
  'Предложение для студентов',
  'Прекрасные апартаменты недорого и в тихом районе',
  'Дешево со всеми удобствами на длительный срок',
];

const PLACE_LIST = [
  {
    kind: 'bungalow',
    nameRu: 'Бунгало',
    minPrice: 0,
    maxPrice: 100000,
  },
  {
    kind: 'flat',
    nameRu:'Квартира',
    minPrice: 1000,
    maxPrice: 100000,
  },
  {
    kind: 'house',
    nameRu:'Дом',
    minPrice: 5000,
    maxPrice: 100000,
  },
  {
    kind: 'hotel',
    nameRu: 'Отель',
    minPrice: 3000,
    maxPrice: 100000,
  },
  {
    kind: 'palace',
    nameRu:'Дворец',
    minPrice: 10000,
    maxPrice: 100000,
  },
];

const ROOM_CAPACITY = [
  { roomValue: '1',
    MIN: 1,
    MAX: 1,
    description: '',
  },
  { roomValue: '2',
    MIN: 1,
    MAX: 2,
    description: '',
  },
  { roomValue: '3',
    MIN: 1,
    MAX: 3,
    description: '',
  },
  { roomValue: '100',
    MIN: 0,
    MAX: 0,
    description: 'не для гостей',
  },
];

const CHECK_IN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECK_OUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const PLACE_FEATURE_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFER_DESCRIPTION_LIST = [
  'Для ценителей истории. Почувствуй себя героем из прошлого.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Уютное гнездышко для молодоженов',
  'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
  'Один из лучших хостелов для душевного общения. Ужинаем вместе и играем в «Мафию» по вечерам, вкусно готовим. Ежедневная уборка, бесплатный Wi-Fi, чистое постельное белье',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе. Возможность поставить палатку',
  'Маленькая чистая квартира на краю парка. Без интернета, регистрации и СМС."',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
];

const PHOTO_TEST_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getPlaceKeyValue = (placeList, inKey, inKeyValue, outKey) => {
  const place = placeList.find((value) => value[inKey] === inKeyValue);
  return place[outKey];
};

const getObjItemByValue = (objectList, inKey, inKeyValue) => {
  const place = objectList.find((value) => value[inKey] === inKeyValue);
  return place;
};

const getOfferTitle = () => OFFER_TITLE_LIST;
const getOfferPlace = () => PLACE_LIST;
const getCheckinTime = () => CHECK_IN_TIME;
const getCheckoutTime = () => CHECK_OUT_TIME;
const getFeatures = () => PLACE_FEATURE_LIST;
const getDescriptions = () => OFFER_DESCRIPTION_LIST;
const getPhotos = () => PHOTO_TEST_LIST;
const getPlaceCapacity = () => ROOM_CAPACITY;

// console.log(getPlaceKeyValue(getOfferPlace(), 'kind', 'hotel', 'nameRu'));


export { getOfferTitle, getOfferPlace, getCheckinTime, getCheckoutTime, getFeatures, getDescriptions, getPhotos, getPlaceKeyValue, getObjItemByValue, getPlaceCapacity };
