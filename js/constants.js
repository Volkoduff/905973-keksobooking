'use strict';
(function () {
  var APPARTMENT_TYPES = {
    bungalo: 'bungalo',
    house: 'house',
    palace: 'palace',
    flat: 'flat'
  };
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ESC_KEYCODE = 27;
  var BIG_PIN = 200;
  var BIG_PIN_HALF = BIG_PIN / 2;
  var PIN_WIDTH = 65;
  var MAP_WIDTH = 1200;
  var MAP_HEIGH_MIN = 130;
  var MAP_HEIGH_MAX = 630;
  var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var AVATAR_NUM = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  window.constants = {
    APPARTMENT_TYPES: APPARTMENT_TYPES,
    TITLE: TITLE,
    TYPE: TYPE,
    ESC_KEYCODE: ESC_KEYCODE,
    BIG_PIN_HALF: BIG_PIN_HALF,
    PIN_WIDTH: PIN_WIDTH,
    MAP_WIDTH: MAP_WIDTH,
    MAP_HEIGH_MIN: MAP_HEIGH_MIN,
    MAP_HEIGH_MAX: MAP_HEIGH_MAX,
    CHECKIN: CHECKIN,
    CHECKOUT: CHECKOUT,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    AVATAR_NUM: AVATAR_NUM,
  };
})();
