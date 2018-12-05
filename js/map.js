'use strict';
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
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
    features: getRandomArrLength(FEATURES),
    photos: getShuffleArray(PHOTOS),
    description: ''
  };

  var author = {
    avatar: 'img/avatars/user' + AVATAR_NUM[i] + '.png'
  };
  var checkinCheckout = 'заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  var roomsGuests = offer.rooms + ' комнат(ы) для ' + offer.guests + ' гостей';
  var randomLocation = 'left: ' + pinLocation.x + 'px' + '; top: ' + pinLocation.y + 'px';
  var pictureAlt = TITLE[i];
  // var pinId = idCounter();
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
    photosSrc: offer.photos,
  };
  mapArr.push(pinObj);
}
var renderPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.dataset.pinId = i;

  pinElement.style = pin.location;
  pinElement.querySelector('img').src = pin.source;
  pinElement.querySelector('img').alt = pin.altText;
  return pinElement;
};
var fragment = document.createDocumentFragment();
for (i = 0; i < mapArr.length; i++) {
  fragment.appendChild(renderPin(mapArr[i]));
}

// mapPin.addEventListener('click', function(evt) {
//   var dinamId = evt.target.dataset.pinId;
// })


var renderCard = function () {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = pinObj.titleArr;
  cardElement.querySelector('.popup__text--address').textContent = pinObj.address;
  cardElement.querySelector('.popup__text--price').textContent = pinObj.price + ' ' + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = pinObj.appartment;
  cardElement.querySelector('.popup__text--capacity').textContent = pinObj.roomGuest;
  cardElement.querySelector('.popup__text--time').textContent = pinObj.check;
  var listElement = cardElement.querySelector('.popup__features');
  listElement.innerHTML = '';
  for (var j = 0; j < offer.features.length; j++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add('popup__feature--' + offer.features[j]);
    listElement.appendChild(newElement);
  }
  cardElement.querySelector('.popup__description').textContent = mapArr.description;
  var oldPhotoElement = cardElement.querySelector('.popup__photos');

  for (var k = 0; k < pinObj.photosSrc.length - 1; k++) {
    var newPhotoElement = cardElement.querySelector('.popup__photo');
    newPhotoElement.src = pinObj.photosSrc[2];
    newPhotoElement = newPhotoElement.cloneNode(true);
    newPhotoElement.src = pinObj.photosSrc[k];
    oldPhotoElement.appendChild(newPhotoElement);
  }
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  return cardElement;

};

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(renderCard());

// var pinCoordinates = [];
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
