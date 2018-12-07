'use strict';
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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
var fielSet = document.querySelectorAll('fieldset');
var adressInput = document.getElementById('address');

for (var i = 0; i < fielSet.length; i++) {
  fielSet[i].setAttribute('disabled', 'disabled');
}

var mapPin = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
  .content.querySelector('article');

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
var getRandomArr = function (array) {
  var randomArr = Math.floor(Math.random() * array.length);
  return array[randomArr];
};

var mapArr = [];

for (i = 0; i <= AVATAR_NUM.length - 1; i++) {
  var appartmentCheck = function (appartmentType) {
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
  };
}
for (i = 0; i <= AVATAR_NUM.length - 1; i++) {
  var randomX = getRandomMinMaxNum(PIN_WIDTH, MAP_WIDTH - PIN_WIDTH);
  var randomY = getRandomMinMaxNum(MAP_HEIGH_MIN, MAP_HEIGH_MAX);
  var pinLocation = {
    x: randomX,
    y: randomY
  };
  var randomArr = getRandomArr(TYPE);
  var offer = {
    coordinates: pinLocation.x + ', ' + pinLocation.y,
    priceObj: getRandomMinMaxNum(1000, 1000000),
    rooms: getRandomMinMaxNum(1, 5),
    titleObj: TITLE[i],
    guests: getRandomMinMaxNum(2, 10),
    checkin: getRandomArr(CHECKIN),
    checkout: getRandomArr(CHECKOUT),
    photos: getRandomArr(PHOTOS),
    description: ''
  };

  var author = {
    avatar: 'img/avatars/user' + AVATAR_NUM[i] + '.png'
  };
  var checkinCheckout = 'заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  var roomsGuests = offer.rooms + ' комнат(ы) для ' + offer.guests + ' гостей';
  var randomLocation = 'left: ' + pinLocation.x + 'px' + '; top: ' + pinLocation.y + 'px';
  var pictureAlt = TITLE[i];
  var pinObj = {
    location: randomLocation,
    source: author.avatar,
    altText: pictureAlt,
    titleArr: offer.titleObj,
    address: offer.coordinates,
    price: offer.priceObj,
    appartment: appartmentCheck(randomArr),
    roomGuest: roomsGuests,
    check: checkinCheckout,
    photosSrc: getShuffleArray(PHOTOS),
    features: getRandomArrLength(FEATURES),
  };
  mapArr.push(pinObj);
}

var renderPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.dataset.pinId = i;
  pinElement.style = pin.location;
  pinElement.querySelector('img').src = pin.source;
  pinElement.querySelector('img').alt = pin.altText;
  pinElement.addEventListener('click', function (evt) {
    refreshCard(mapArr[evt.currentTarget.dataset.pinId]);
    pinElement.addEventListener('keydown', function (enterEvt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        enterEvt.refreshCard(mapArr[evt.currentTarget.dataset.pinId]);
      }
    });
  });
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < mapArr.length; i++) {
  fragment.appendChild(renderPin(mapArr[i], i));
}

var renderCard = function () {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.classList.add('hidden');
  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    cardElement.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      cardElement.classList.add('hidden');
    }
  });
  return cardElement;
};

var refreshCard = function (pin) {
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

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(renderCard());

var mainPin = document.querySelector('.map__pin');
mainPin.addEventListener('mouseup', function (evt) {
  evt.stopPropagation();
  fade.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  for (i = 0; i < fielSet.length; i++) {
    fielSet[i].removeAttribute('disabled', 'disabled');
  }
  var pageCoordinade = mainPin.getBoundingClientRect();
  var newCoordinate = (pageCoordinade.x - BIG_PIN_HALF) + ', ' + (pageCoordinade.y - BIG_PIN_HALF);
  adressInput.setAttribute('placeholder', newCoordinate);

  mapPin.appendChild(fragment);
  var beforeTag = document.querySelector('.map__filters-container');
  beforeTag.parentNode.insertBefore(fragmentCard, beforeTag);
});
