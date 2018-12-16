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

var adressInput = document.getElementById('address');
var qtyOfRooms = document.getElementById('room_number');
var qtyOfGuests = document.getElementById('capacity');
var formApartmentPrice = document.getElementById('price');
var formApartmentType = document.getElementById('type');
var timeInField = document.getElementById('timein');
var timeOutField = document.getElementById('timeout');
var checkinCheckoutForm = document.getElementById('timein');

/* /////////////////////////querySelector///////////////////////// */
var fade = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldSet = document.querySelectorAll('.ad-form__element');
var mainPin = document.querySelector('.map__pin');
var mapPin = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('article');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

/* /////////////////////////область вызова инструкций///////////////////////// */
var mapArray = [];

qtyOfRooms.addEventListener('change', function () {
  setLimitationsToFormCapacityOfRoom();
});

formApartmentType.addEventListener('change', function () {
  setLimitationsToMinimalPriceByAppartmentType();
});

for (var i = 0; i < fieldSet.length; i++) {
  fieldSet[i].setAttribute('disabled', 'disabled');
}

mainPin.addEventListener('mouseup', function () {
  unlockPin();
});

mainPin.addEventListener('mouseup', function () {
  setCoordinatesOfMainPin();
  generatePinsFromTemplate();
});

generateDataArray();

var pinFragment = document.createDocumentFragment();
appendChildOfRenderPin();


/* /////////////////////////область объявления функций///////////////////////// */
function unlockPin() {
  for (i = 0; i < fieldSet.length; i++) {
    fade.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    fieldSet[i].removeAttribute('disabled', 'disabled');
    mainPin.removeEventListener('mouseup', function () {
      unlockPin();
    });
  }
}

function setCoordinatesOfMainPin() {
  var pageCoordinade = mainPin.getBoundingClientRect();
  var newCoordinate = (pageCoordinade.x - BIG_PIN_HALF) + ', ' + (pageCoordinade.y - BIG_PIN_HALF);
  adressInput.setAttribute('placeholder', newCoordinate);
}

function renderPin(pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.dataset.pinId = i;
  pinElement.style = pin.location;
  pinElement.querySelector('img').src = pin.source;
  pinElement.querySelector('img').alt = pin.titleArray;
  pinElement.addEventListener('click', function () {
    deleteCardIfItIsCreated();
  });
  pinElement.addEventListener('click', function (evt) {
    createPopupCard(evt, mapArray);
  });
  return pinElement;
}

function deleteCardIfItIsCreated() {
  var cardToDelete = document.querySelector('.map__card');
  if (cardToDelete !== null) {
    cardToDelete.remove();
  }
}

function createPopupCard(evt) {
  var beforeTag = document.querySelector('.map__filters-container');
  var fragmentCard = document.createDocumentFragment();
  fragmentCard.appendChild(refreshCard(mapArray[evt.currentTarget.dataset.pinId]));
  beforeTag.parentNode.insertBefore(fragmentCard, beforeTag);
}

function refreshCard(pin) {
  var cardElement = cardTemplate.cloneNode(true);
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
    createPhotoElement();
  }

  function createPhotoElement() {
    var newPhotoElement = cardElement.querySelector('.popup__photo');
    newPhotoElement = document.createElement('img');
    newPhotoElement.src = pin.photosSrc[k];
    newPhotoElement.alt = 'Фотография жилья';
    newPhotoElement.style.width = '45px';
    newPhotoElement.style.height = '40px';
    newPhotoElement.classList.add('popup__photo');
    oldPhotoElement.appendChild(newPhotoElement);
  }
  addCardHandlers(cardElement);
  return cardElement;
}

function addCardHandlers(cardElement) {
  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    cardElement.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      cardElement.classList.add('hidden');
    }
  });
}

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
function getRandomLengthArray(array) {
  var generatedArrayOfFeatures = getShuffleArray(array);
  var randomFinishIndex = getRandomMinMaxNumber(1, array.length);
  generatedArrayOfFeatures = array.slice(1, randomFinishIndex);
  return generatedArrayOfFeatures;
}

// Возвращает произвольную строку из массива
function getRandomArrayElement(array) {
  var randomArray = Math.floor(Math.random() * array.length);
  return array[randomArray];
}

function generateDataArray() {
  for (i = 0; i <= AVATAR_NUM.length - 1; i++) {
    var pinObj = {
      location: getRandomLocationCoordinates(),
      source: getAvatarUrlAdress(),
      titleArray: TITLE[i],
      address: getLocationCoordinateX() + ', ' + getLocationCoordinateY(),
      price: getRandomMinMaxNumber(1000, 1000000),
      appartment: getAppartmentType(getRandomArrayElement(TYPE)),
      roomGuest: getRoomGuestDataString(),
      check: getCheckinCheckoutDataString(),
      photosSrc: getShuffleArray(PHOTOS),
      features: getRandomLengthArray(FEATURES),
    };
    mapArray.push(pinObj);
  }
  return mapArray;
}

function getAppartmentType(type) {
  var appartmentType = type;
  switch (type) {
    case ('flat'):
      appartmentType = 'Квартира';
      break;
    case ('bungalo'):
      appartmentType = 'Бунгало';
      break;
    case ('house'):
      appartmentType = 'Дом';
      break;
    default:
      appartmentType = 'Дворец';
  }
  return appartmentType;
}

function getCheckinCheckoutDataString() {
  var checkinCheckout = 'заезд после ' + getRandomArrayElement(CHECKIN) + ', выезд до ' + getRandomArrayElement(CHECKOUT);
  return checkinCheckout;
}

function getRoomGuestDataString() {
  var roomsGuests = getRandomMinMaxNumber(1, 5) + ' комнат(ы) для ' + getRandomMinMaxNumber(2, 10) + ' гостей';
  return roomsGuests;
}

function getRandomLocationCoordinates() {
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

function appendChildOfRenderPin() {
  for (i = 0; i < mapArray.length; i++) {
    pinFragment.appendChild(renderPin(mapArray[i]));
  }
}

function generatePinsFromTemplate() {
  mapPin.appendChild(pinFragment);
}

// Синхронизация формы: кол-во комнат / кол-ву гостей
function setLimitationsToFormCapacityOfRoom() {
  var currentVal = qtyOfRooms.value;
  if (currentVal === 1) {
    for (i = 0; i < qtyOfGuests.children.length; i++) {
      qtyOfGuests.children[i].disabled = true;
    }
  } else {
    for (i = 0; i < qtyOfGuests.children.length; i++) {
      if (i < currentVal) {
        qtyOfGuests.children[i].disabled = false;
      } else {
        qtyOfGuests.children[i].disabled = true;
      }
    }
    qtyOfGuests.children[0].selected = true;
  }
}

// Синхронизация формы: время заезда / время выезда
checkinCheckoutForm.onchange = function (event) {
  timeInField.value = event.target.value;
  timeOutField.value = event.target.value;
};

function setLimitationsToMinimalPriceByAppartmentType() {
  var currentVal = formApartmentType.value;
  if (currentVal === 'bungalo') {
    formApartmentPrice.min = 0;
    formApartmentPrice.placeholder = 0;
  } else if (currentVal === 'flat') {
    formApartmentPrice.min = 1000;
    formApartmentPrice.placeholder = 1000;
  } else if (currentVal === 'house') {
    formApartmentPrice.min = 5000;
    formApartmentPrice.placeholder = 5000;
  } else if (currentVal === 'palace') {
    formApartmentPrice.min = 10000;
    formApartmentPrice.placeholder = 10000;
  }
}
