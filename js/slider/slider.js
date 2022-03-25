import { getGlobalMinPrice, getGlobalMaxPrice  } from '../config.js';
const createSliderObject = (sliderElement) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: getGlobalMinPrice(),
      max: getGlobalMaxPrice(),
      //
    },
    step: 10,
    start: '',
    connect: 'lower',
  });
};

const setSliderListeners = (sliderElement, inputElement) => {
  let timerId = 0;
  sliderElement.noUiSlider.on('slide', () => {
    clearTimeout(timerId);
    inputElement.value = sliderElement.noUiSlider.get();
    timerId = setTimeout(()=>{
      inputElement.dispatchEvent(new Event('input'));
    },100);
  });

  inputElement.addEventListener('input', () => {
    sliderElement.noUiSlider.set(inputElement.value);
  } );
};

export { createSliderObject, setSliderListeners };
