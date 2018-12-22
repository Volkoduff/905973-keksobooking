'use strict';
(function () {
  var generatePinsData = function (dataServer) {
    var serverArray = dataServer;
    var dataLocal = [];
    for (var serverArrayIndex = 0; serverArrayIndex <= serverArray.length; serverArrayIndex++) {
      var pinData = {
        location: getLocation(),
        // source: getAvatarUrlAdress(),
        // titleArray: window.constants.TITLE[i],
        address: '',
        // price: window.utilities.getRandomMinMaxNumber(1000, 1000000),
        // appartment: getAppartmentType(window.utilities.getRandomArrayElement(window.constants.TYPE)),
        // roomGuest: getRoomGuestDataString(),
        // check: getCheckinCheckoutDataString(),
        // photosSrc: window.utilities.getShuffleArray(window.constants.PHOTOS),
        // features: window.utilities.getRandomLengthArray(window.constants.FEATURES),
      };
      dataLocal.push(pinData);
    }
    function getLocation() {
      var randomX = serverArray[serverArrayIndex].location.x;
      var randomY = serverArray[serverArrayIndex].location.y;
      var randomLocation = 'left: ' + randomX + 'px' + '; top: ' + randomY + 'px';
      return randomLocation;
    }
    return dataLocal;
  };

  window.backend.downloadData(URL, generatePinsData);

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

  function getAvatarUrlAdress() {
    var avatar = 'img/avatars/user' + window.utilities.getRandomArrayElement(window.constants.AVATAR_NUM) + '.png';
    return avatar;
  }

  window.dataGenerator = {
    generatePinsData: generatePinsData,
  };
})();
