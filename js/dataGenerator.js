'use strict';
(function () {
  var generatePinsData = function (dataServer) {
    var serverArray = dataServer;
    var dataLocal = [];
    for (var serverArrayIndex = 0; serverArrayIndex <= serverArray.length - 1; serverArrayIndex++) {
      var pinData = {
        location: getLocation(serverArray, serverArrayIndex),
        source: serverArray[serverArrayIndex].author.avatar,
        titleArray: serverArray[serverArrayIndex].offer.title,
        address: serverArray[serverArrayIndex].offer.address,
        description: serverArray[serverArrayIndex].offer.description,
        price: serverArray[serverArrayIndex].offer.price,
        appartment: getAppartmentType(serverArray, serverArrayIndex),
        roomGuest: serverArray[serverArrayIndex].offer.rooms,
        check: getCheckinCheckoutDataString(serverArray, serverArrayIndex),
        photosSrc: serverArray[serverArrayIndex].offer.photos,
        features: serverArray[serverArrayIndex].offer.features,
      };
      dataLocal.push(pinData);
    }
    return dataLocal;
  };

  window.backend.downloadData(URL, generatePinsData);

  function getLocation(serverArray, serverArrayIndex) {
    var randomX = serverArray[serverArrayIndex].location.x;
    var randomY = serverArray[serverArrayIndex].location.y;
    var randomLocation = 'left: ' + randomX + 'px' + '; top: ' + randomY + 'px';
    return randomLocation;
  }

  function getAppartmentType(serverArray, serverArrayIndex) {
    var appartmentType = serverArray[serverArrayIndex].offer.type;
    switch (appartmentType) {
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

  function getCheckinCheckoutDataString(serverArray, serverArrayIndex) {
    var checkinCheckout = 'заезд после ' + serverArray[serverArrayIndex].offer.checkin + ', выезд до ' + serverArray[serverArrayIndex].offer.checkout;
    return checkinCheckout;
  }

  window.dataGenerator = {
    generatePinsData: generatePinsData,
  };
})();
