import {
  getRandomFloat,
  getRandomInteger,
  getRandomSubArray,
  getNonUnicRangomArray,
  getRandomItem
} from './utils.js';
import {
  getOfferTitle,
  getOfferPlace,
  getCheckinTime,
  getFeatures,
  getDescriptions,
  getPhotos
} from '../config.js';

const TEST_OBJECT_NUM = 10;
const TEST_PRICE_MIN = 1000000;
const TEST_PRICE_MAX = 1000000;
const TEST_ROOM_MIN = 0;
const TEST_ROOM_MAX = 100;
const TEST_GUEST_MIN = 0;
const TEST_GUEST_MAX = 3;
const TEST_LAT_MIN = 35.65000;
const TEST_LAT_MAX = 35.70000;
const TEST_LAT_PRECISION = 5;
const TEST_LNG_MIN = 139.70000;
const TEST_LNG_MAX = 139.80000;
const TEST_LNG_PRECISION = 5;

const getLeadZero = (index) => index < 10 ? `0${index}` : `${index}`;

const getAvatarLink = (index) => `img/avatars/user0${getLeadZero(index%100)}.png`;

const titles = getOfferTitle();
const kinds = getOfferPlace().map((place) => place.kind);
const checkIns = getCheckinTime();
const features = getFeatures();
const descriptions = getDescriptions();

const formatAddressByLocation = ({
  lat,
  lng
}) => `${lat}, ${lng}`;
const getRandomLocation = () => ({
  lat: getRandomFloat(TEST_LAT_MIN, TEST_LAT_MAX, TEST_LAT_PRECISION),
  lng: getRandomFloat(TEST_LNG_MIN, TEST_LNG_MAX, TEST_LNG_PRECISION),
});

const createOfferItem = () => {
  const location = getRandomLocation();
  const checkIn = getRandomItem(checkIns);
  return {
    author: {
      avatar: getAvatarLink(getRandomInteger(0,99)),
    },
    offer: {
      title: getRandomItem(titles),
      address: formatAddressByLocation(location),
      price: getRandomInteger(TEST_PRICE_MIN, TEST_PRICE_MAX),
      type: getRandomItem(kinds),
      rooms: getRandomInteger(TEST_ROOM_MIN, TEST_ROOM_MAX),
      guests: getRandomInteger(TEST_GUEST_MIN, TEST_GUEST_MAX),
      checkin: checkIn,
      checkout: checkIn,
      features: getRandomSubArray(features),
      description: getRandomItem(descriptions),
      photos: getNonUnicRangomArray(getPhotos(), getRandomInteger(1, 5)),
      location,
    }
  };
};
export const createOfferList = (length = TEST_OBJECT_NUM) =>  Array.from({length},() => createOfferItem());

