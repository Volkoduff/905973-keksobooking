'use strict';
(function () {
  var roomsQuantity = document.getElementById('room_number');
  var formApartmentType = document.getElementById('type');
  var roomsCapacity = document.getElementById('capacity');
  var formApartmentPrice = document.getElementById('price');

  // Синхронизация формы: кол-во комнат / кол-ву гостей
  function setFormRoomCapacityLimitation() {
    var currentVal = roomsQuantity.value;
    if (currentVal === 1) {
      for (var i = 0; i < roomsCapacity.children.length; i++) {
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
    if (currentVal === window.constants.APPARTMENT_TYPES.bungalo) {
      formApartmentPrice.min = 0;
      formApartmentPrice.placeholder = 0;
    } else if (currentVal === window.constants.APPARTMENT_TYPES.flat) {
      formApartmentPrice.min = 1000;
      formApartmentPrice.placeholder = 1000;
    } else if (currentVal === window.constants.APPARTMENT_TYPES.house) {
      formApartmentPrice.min = 5000;
      formApartmentPrice.placeholder = 5000;
    } else if (currentVal === window.constants.APPARTMENT_TYPES.palace) {
      formApartmentPrice.min = 10000;
      formApartmentPrice.placeholder = 10000;
    }
  }

  function formInit() {
    roomsQuantity.addEventListener('change', function () {
      setFormRoomCapacityLimitation();
    });
    formApartmentType.addEventListener('change', function () {
      setLimitationsToMinimalPriceByAppartmentType();
    });
  }
  window.forms = {
    formInit: formInit,
  };
})();

