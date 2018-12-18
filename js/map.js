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
var APPARTMENT_TYPES = {
  bungalo: 'bungalo',
  house: 'house',
  palace: 'palace',
  flat: 'flat'
};

var roomsQuantity = document.getElementById('room_number');
var roomsCapacity = document.getElementById('capacity');
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

roomsQuantity.addEventListener('change', function () {
  setFormRoomCapacityLimitation();
});

formApartmentType.addEventListener('change', function () {
  setLimitationsToMinimalPriceByAppartmentType();
});

checkinCheckoutForm.onchange = function (event) {
  timeInField.value = event.target.value;
  timeOutField.value = event.target.value;
};

for (var i = 0; i < fieldSet.length; i++) {
  fieldSet[i].setAttribute('disabled', 'disabled');
}

mainPin.addEventListener('mousedown', function () {
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

  for (var photoIndex = 0; photoIndex < pin.photosSrc.length; photoIndex++) {
    createPhotoElement(cardElement, photoIndex, pin, oldPhotoElement);
  }

  addCardHandlers(cardElement);
  return cardElement;
}


function createPhotoElement(cardElement, photoIndex, pin, oldPhotoElement) {
  var newPhotoElement = cardElement.querySelector('.popup__photo');
  newPhotoElement = document.createElement('img');
  newPhotoElement.src = pin.photosSrc[photoIndex];
  newPhotoElement.alt = 'Фотография жилья';
  newPhotoElement.style.width = '45px';
  newPhotoElement.style.height = '40px';
  newPhotoElement.classList.add('popup__photo');
  oldPhotoElement.appendChild(newPhotoElement);
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
    case (APPARTMENT_TYPES.flat):
      appartmentType = 'Квартира';
      break;
    case (APPARTMENT_TYPES.bungalo):
      appartmentType = 'Бунгало';
      break;
    case (APPARTMENT_TYPES.house):
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
function setFormRoomCapacityLimitation() {
  var currentVal = roomsQuantity.value;
  if (currentVal === 1) {
    for (i = 0; i < roomsCapacity.children.length; i++) {
      roomsCapacity.children[i].disabled = true;
    }
  } else {
    for (i = 0; i < roomsCapacity.children.length; i++) {
      if (i < currentVal) {
        roomsCapacity.children[i].disabled = false;
      } else {
        roomsCapacity.children[i].disabled = true;
      }
    }
    roomsCapacity.children[0].selected = true;
  }
}

function setLimitationsToMinimalPriceByAppartmentType() {
  var currentVal = formApartmentType.value;
  if (currentVal === APPARTMENT_TYPES.bungalo) {
    formApartmentPrice.min = 0;
    formApartmentPrice.placeholder = 0;
  } else if (currentVal === APPARTMENT_TYPES.flat) {
    formApartmentPrice.min = 1000;
    formApartmentPrice.placeholder = 1000;
  } else if (currentVal === APPARTMENT_TYPES.house) {
    formApartmentPrice.min = 5000;
    formApartmentPrice.placeholder = 5000;
  } else if (currentVal === APPARTMENT_TYPES.palace) {
    formApartmentPrice.min = 10000;
    formApartmentPrice.placeholder = 10000;
  }
}

var isDrag = false;

var rectObject = fade.getBoundingClientRect();

var limits = {
  top: rectObject.top + MAP_HEIGH_MIN,
  right: rectObject.right,
  bottom: rectObject.bottom - BIG_PIN_HALF,
  left: rectObject.left
};

mainPin.onmousedown = function () {
  isDrag = true;
};
document.onmouseup = function () {
  isDrag = false;
};
document.onmousemove = function (evt) {
  if (isDrag) {
    move(evt);
  }
};

function move(evt) {
  unlockPin();
  var newLocation = {
    x: limits.left,
    y: limits.top
  };

  if (evt.pageX > limits.right) {
    newLocation.x = limits.right;
  } else if (evt.pageX > limits.left) {
    newLocation.x = evt.pageX;
  }
  if (evt.pageY > limits.bottom) {
    newLocation.y = limits.bottom;
  } else if (evt.pageY > limits.top) {
    newLocation.y = evt.pageY;
  }
  relocate(newLocation);
}

function relocate(newLocation) {
  mainPin.style.left = newLocation.x + 'px';
  mainPin.style.top = newLocation.y + 'px';
}
