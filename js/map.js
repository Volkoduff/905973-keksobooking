'use strict';
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ESC_KEYCODE = 27;
var BIG_PIN = 200;
var BIG_PIN_HALF = BIG_PIN / 2;
var PIN_WIDTH = 65;
var MAP_WIDTH = 1200;
var MAP_HEIGH_MIN = 130;
var MAP_HEIGH_MAX = 630;
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATAR_NUM = ['01', '02', '03', '04', '05', '06', '07', '08'];
var fade = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldSet = document.querySelectorAll('.ad-form__element');
var adressInput = document.getElementById('address');
var cardTemplate = document.querySelector('#card').content.querySelector('article');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragmentCard = document.createDocumentFragment();
var pinFragment = document.createDocumentFragment();
var mainPin = document.querySelector('.map__pin');
var mapPin = document.querySelector('.map__pins');
var mapArray = [];

for (var i = 0; i < fieldSet.length; i++) {
  fieldSet[i].setAttribute('disabled', 'disabled');
}

getUnlockOfMapByMouseUp();

getCoodinatesOfMainPin();

generateDataObjectsInMapArray();

function renderPin(pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.dataset.pinId = i;
  pinElement.style = pin.location;
  pinElement.querySelector('img').src = pin.source;
  pinElement.querySelector('img').alt = pin.titleArray;
  pinElement.addEventListener('click', function(evt) {
    refreshCard(mapArray[evt.currentTarget.dataset.pinId]);
  });
  return pinElement;
}

getAppendChildOfRenderPin();

function refreshCard(pin) {
  var cardElement = cardTemplate;
  cardElement.querySelector('.popup__title').textContent = pin.titleArray;
  cardElement.querySelector('.popup__text--address').textContent = pin.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.price + ' ' + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = pin.appartment;
  cardElement.querySelector('.popup__text--capacity').textContent = pin.roomGuest;
  cardElement.querySelector('.popup__text--time').textContent = pin.check;
  cardElement.querySelector('.popup__description').textContent = pin.description;
  cardElement.querySelector('.popup__avatar').src = pin.source;
  var listElement = cardElement.querySelector('.popup__features');
  listElement.innerHTML = '';

  for (var j = 0; j < pin.features.length; j++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add('popup__feature--' + pin.features[j]);
    listElement.appendChild(newElement);
  }
  var oldPhotoElement = cardElement.querySelector('.popup__photos');
  oldPhotoElement.innerHTML = '';

  for (var k = 0; k < pin.photosSrc.length; k++) {
    var newPhotoElement = cardElement.querySelector('.popup__photo');
    newPhotoElement = document.createElement('img');
    newPhotoElement.src = pin.photosSrc[k];
    newPhotoElement.alt = 'Фотография жилья';
    newPhotoElement.style.width = '45px';
    newPhotoElement.style.height = '40px';
    newPhotoElement.classList.add('popup__photo');
    oldPhotoElement.appendChild(newPhotoElement);
  }
  return cardElement;
}

fragmentCard.appendChild(refreshCard());

function getRandomMinMaxNumber(min, max) {
  var randomMinMaxNum = Math.floor(Math.random() * (max - min) + min);
  return randomMinMaxNum;
}

function getShuffleArray(array) {
  function compareRandom() {
    return Math.random() - 0.5;
  }
  array.sort(compareRandom);
  return array;
}

// Массив строк произвольной длинны
function getRandomArrayLength(array) {
  var featuresGeneric = getShuffleArray(array);
  var randomFinishIndex = getRandomMinMaxNumber(1, array.length);
  featuresGeneric = array.slice(1, randomFinishIndex);
  return featuresGeneric;
}

// Возвращает произвольную строку из массива
function getRandomArray(array) {
  var randomArray = Math.floor(Math.random() * array.length);
  return array[randomArray];
}

function generateDataObjectsInMapArray() {
  for (i = 0; i <= AVATAR_NUM.length - 1; i++) {
    var pinObj = {
      location: getRandomLocationCoordinatesString(),
      source: getAvatarUrlAdress(),
      titleArray: TITLE[i],
      address: getLocationCoordinateX() + ', ' + getLocationCoordinateY(),
      price: getRandomMinMaxNumber(1000, 1000000),
      appartment: appartmentCheck(getRandomArray(TYPE)),
      roomGuest: getRoomGuestDataString(),
      check: getCheckinCheckoutDataString(),
      photosSrc: getShuffleArray(PHOTOS),
      features: getRandomArrayLength(FEATURES),
    };
    mapArray.push(pinObj);
  }
  return mapArray;
}

function appartmentCheck(appartmentType) {
  switch (appartmentType) {
    case ('flat'):
      var rusAppart = 'Квартира';
      break;
    case ('bungalo'):
      rusAppart = 'Бунгало';
      break;
    case ('house'):
      rusAppart = 'Дом';
      break;
    default:
      rusAppart = 'Дворец';
      break;
  }
  return rusAppart;
}

function getCheckinCheckoutDataString() {
  var checkinCheckout = 'заезд после ' + getRandomArray(CHECKIN) + ', выезд до ' + getRandomArray(CHECKOUT);
  return checkinCheckout;
}

function getRoomGuestDataString() {
  var roomsGuests = getRandomMinMaxNumber(1, 5) + ' комнат(ы) для ' + getRandomMinMaxNumber(2, 10) + ' гостей';
  return roomsGuests;
}

function getRandomLocationCoordinatesString() {
  var randomLocation = 'left: ' + getLocationCoordinateX() + 'px' + '; top: ' + getLocationCoordinateY() + 'px';
  return randomLocation;
}

function getAvatarUrlAdress() {
  var avatar = 'img/avatars/user' + AVATAR_NUM[i] + '.png';
  return avatar;
}

function getLocationCoordinateX() {
  var randomX = getRandomMinMaxNumber(PIN_WIDTH, MAP_WIDTH - PIN_WIDTH);
  return randomX;
}

function getLocationCoordinateY() {
  var randomY = getRandomMinMaxNumber(MAP_HEIGH_MIN, MAP_HEIGH_MAX);
  return randomY;
}

function getUnlockOfMapByMouseUp() {
  mainPin.addEventListener('mouseup', function() {
    for (i = 0; i < fieldSet.length; i++) {
      fade.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      fieldSet[i].removeAttribute('disabled', 'disabled');
    }
  });
}

function getCoodinatesOfMainPin() {
  mainPin.addEventListener('mouseup', function() {
    var pageCoordinade = mainPin.getBoundingClientRect();
    var newCoordinate = (pageCoordinade.x - BIG_PIN_HALF) + ', ' + (pageCoordinade.y - BIG_PIN_HALF);
    adressInput.setAttribute('placeholder', newCoordinate);
    generatePinsAndCardTemplate();
  });
}

function getAppendChildOfRenderPin() {
  for (i = 0; i < mapArray.length; i++) {
    pinFragment.appendChild(renderPin(mapArray[i]));
  }
}

function generatePinsAndCardTemplate() {
  mapPin.appendChild(pinFragment);
  var beforeTag = document.querySelector('.map__filters-container');
  beforeTag.parentNode.insertBefore(fragmentCard, beforeTag);
}
