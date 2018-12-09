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
var fielSet = document.querySelectorAll('.ad-form__element');
var adressInput = document.getElementById('address');

//  Разблокировка по клику на кексо-пин
var mainPin = document.querySelector('.map__pin');
for (var i = 0; i < fielSet.length; i++) {
  fielSet[i].setAttribute('disabled', 'disabled');
}

mainPin.addEventListener('mouseup', function() {
  for (i = 0; i < fielSet.length; i++) {
    fade.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    fielSet[i].removeAttribute('disabled', 'disabled');
  }
});

//  Выставляет координаты кекса-пина
var mapPin = document.querySelector('.map__pins');
mainPin.addEventListener('mouseup', function() {
  var pageCoordinade = mainPin.getBoundingClientRect();
  var newCoordinate = (pageCoordinade.x - BIG_PIN_HALF) + ', ' + (pageCoordinade.y - BIG_PIN_HALF);
  adressInput.setAttribute('placeholder', newCoordinate);
  generatePinsAndCardTemplate();
});


//  Перемещение сгенерированных данных в обьекты через цикл в массив
var mapArr = [];
for (i = 0; i <= AVATAR_NUM.length - 1; i++) {
  var pinObj = {
    location: getRandomLocationCoordinatesString(),
    source: getAvatarUrlAdress(),
    titleArr: TITLE[i],
    address: getLocationCoordinateX() + ', ' + getLocationCoordinateY(),
    price: getRandomMinMaxNum(1000, 1000000),
    appartment: appartmentCheck(getRandomArr(TYPE)),
    roomGuest: getRoomGuestDataString(),
    check: getCheckinCheckoutDataString(),
    photosSrc: getShuffleArray(PHOTOS),
    features: getRandomArrLength(FEATURES),
  };
  mapArr.push(pinObj);
}

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function renderPin(pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.dataset.pinId = i;
  pinElement.style = pin.location;
  pinElement.querySelector('img').src = pin.source;
  pinElement.querySelector('img').alt = pin.titleArr;
  pinElement.addEventListener('click', function(evt) {
    refreshCard(mapArr[evt.currentTarget.dataset.pinId]);
  });
  return pinElement;
}

var pinFragment = document.createDocumentFragment();
for (i = 0; i < mapArr.length; i++) {
  pinFragment.appendChild(renderPin(mapArr[i], i));
}

var cardTemplate = document.querySelector('#card').content.querySelector('article');

function renderCard() {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.classList.add('hidden');
  cardElement.querySelector('.popup__close').addEventListener('click', function() {
    cardElement.classList.add('hidden');
  });

  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      cardElement.classList.add('hidden');
    }
  });
  return cardElement;
}

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(renderCard());

var refreshCard = function(pin) {
  var card = document.querySelector('.map .map__card');
  card.classList.remove('hidden');
  card.querySelector('.popup__title').textContent = pin.titleArr;
  card.querySelector('.popup__text--address').textContent = pin.address;
  card.querySelector('.popup__text--price').textContent = pin.price + ' ' + '₽/ночь';
  card.querySelector('.popup__type').textContent = pin.appartment;
  card.querySelector('.popup__text--capacity').textContent = pin.roomGuest;
  card.querySelector('.popup__text--time').textContent = pin.check;
  card.querySelector('.popup__description').textContent = pin.description;
  card.querySelector('.popup__avatar').src = pin.source;
  var listElement = card.querySelector('.popup__features');
  listElement.innerHTML = '';

  for (var j = 0; j < pin.features.length; j++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add('popup__feature--' + pin.features[j]);
    listElement.appendChild(newElement);
  }
  var oldPhotoElement = card.querySelector('.popup__photos');
  oldPhotoElement.innerHTML = '';

  for (var k = 0; k < pin.photosSrc.length; k++) {
    var newPhotoElement = card.querySelector('.popup__photo');
    newPhotoElement = document.createElement('img');
    newPhotoElement.src = pin.photosSrc[k];
    newPhotoElement.alt = 'Фотография жилья';
    newPhotoElement.style.width = '45px';
    newPhotoElement.style.height = '40px';
    newPhotoElement.classList.add('popup__photo');
    oldPhotoElement.appendChild(newPhotoElement);
  }
};

// Случайное число в диапазоне min/max
function getRandomMinMaxNum(min, max) {
  var randomMinMaxNum = Math.floor(Math.random() * (max - min) + min);
  return randomMinMaxNum;
}

// Массив строк в произвольном порядке
function getShuffleArray(arr) {
  function compareRandom() {
    return Math.random() - 0.5;
  }
  arr.sort(compareRandom);
  return arr;
}

// Массив строк произвольной длинны
function getRandomArrLength(arr) {
  var featuresGeneric = getShuffleArray(arr);
  var randomFinishIndex = getRandomMinMaxNum(1, arr.length);
  featuresGeneric = arr.slice(1, randomFinishIndex);
  return featuresGeneric;
}

// Возвращает произвольную строку из массива
function getRandomArr(array) {
  var randomArr = Math.floor(Math.random() * array.length);
  return array[randomArr];
}

function generatePinsAndCardTemplate() {
  mapPin.appendChild(pinFragment);
  var beforeTag = document.querySelector('.map__filters-container');
  beforeTag.parentNode.insertBefore(fragmentCard, beforeTag);
}

//  Проверка, возвращает переменную с типом жилища
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
  var checkinCheckout = 'заезд после ' + getRandomArr(CHECKIN) + ', выезд до ' + getRandomArr(CHECKOUT);
  return checkinCheckout;
}

function getRoomGuestDataString() {
  var roomsGuests = getRandomMinMaxNum(1, 5) + ' комнат(ы) для ' + getRandomMinMaxNum(2, 10) + ' гостей';
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
  var randomX = getRandomMinMaxNum(PIN_WIDTH, MAP_WIDTH - PIN_WIDTH);
  return randomX;
}

function getLocationCoordinateY() {
  var randomY = getRandomMinMaxNum(MAP_HEIGH_MIN, MAP_HEIGH_MAX);
  return randomY;
}