'use strict';
(function () {
  function generateDataArray() {
    for (i = 0; i <= window.constants.AVATAR_NUM.length - 1; i++) {
      var pinObj = {
        location: getRandomLocationCoordinates(),
        source: getAvatarUrlAdress(),
        titleArray: window.constants.TITLE[i],
        address: getLocationCoordinateX() + ', ' + getLocationCoordinateY(),
        price: window.utilities.getRandomMinMaxNumber(1000, 1000000),
        appartment: getAppartmentType(window.utilities.getRandomArrayElement(window.constants.TYPE)),
        roomGuest: getRoomGuestDataString(),
        check: getCheckinCheckoutDataString(),
        photosSrc: window.utilities.getShuffleArray(window.constants.PHOTOS),
        features: window.utilities.getRandomLengthArray(window.constants.FEATURES),
      };
      mapArray.push(pinObj);
    }
    return mapArray;
  }

  function getAppartmentType(type) {
    var appartmentType = type;
    switch (type) {
      case (window.constants.APPARTMENT_TYPES.flat):
        appartmentType = 'Квартира';
        break;
      case (window.constants.APPARTMENT_TYPES.bungalo):
        appartmentType = 'Бунгало';
        break;
      case (window.constants.APPARTMENT_TYPES.house):
        appartmentType = 'Дом';
        break;
      default:
        appartmentType = 'Дворец';
    }
    return appartmentType;
  }


  function getCheckinCheckoutDataString() {
    var checkinCheckout = 'заезд после ' + window.utilities.getRandomArrayElement(window.constants.CHECKIN) + ', выезд до ' + window.utilities.getRandomArrayElement(window.constants.CHECKOUT);
    return checkinCheckout;
  }

  function getRoomGuestDataString() {
    var roomsGuests = window.utilities.getRandomMinMaxNumber(1, 5) + ' комнат(ы) для ' + window.utilities.getRandomMinMaxNumber(2, 10) + ' гостей';
    return roomsGuests;
  }

  function getRandomLocationCoordinates() {
    var randomLocation = 'left: ' + getLocationCoordinateX() + 'px' + '; top: ' + getLocationCoordinateY() + 'px';
    return randomLocation;
  }

  function getAvatarUrlAdress(i) {
    var avatar = 'img/avatars/user' + window.constants.AVATAR_NUM[i] + '.png';
    return avatar;
  }

  function getLocationCoordinateX() {
    var randomX = window.utilities.getRandomMinMaxNumber(window.constants.PIN_WIDTH, window.constants.MAP_WIDTH - window.constants.PIN_WIDTH);
    return randomX;
  }

  function getLocationCoordinateY() {
    var randomY = window.utilities.getRandomMinMaxNumber(window.constants.MAP_HEIGH_MIN, window.constants.MAP_HEIGH_MAX);
    return randomY;
  }
  window.calculations = {
    generateDataArray: generateDataArray,
  };
})();
