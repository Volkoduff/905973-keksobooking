'use strict';
(function() {
  var mainPin = document.querySelector('.map__pin');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fade = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldSet = document.querySelectorAll('.ad-form__element');
  var adressInput = document.getElementById('address');
  var mapPins = document.querySelector('.map__pins');

  function unlockPin() {
    for (var i = 0; i < fieldSet.length; i++) {
      fade.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      fieldSet[i].removeAttribute('disabled', 'disabled');
    }
  }

  function renderPin(pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style = pin.location;
    pinElement.querySelector('img').src = pin.source;
    pinElement.querySelector('img').alt = pin.titleArray;
    pinElement.addEventListener('click', function() {
      window.card.deleteCardIfItIsCreated();
    });
    pinElement.addEventListener('click', function(evt) {
      window.card.createPopupCard(evt, pin);
    });
    return pinElement;
  }

  function renderPins(pinsData) {
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < pinsData.length; i++) {
      pinFragment.appendChild(renderPin(pinsData[i]));
    }
    return pinFragment;
  }

  function setCoordinatesOfMainPin() {
    var pinCoordinateY = mainPin.offsetTop;
    var pinCoordinateX = mainPin.offsetLeft;
    var newCoordinate = (pinCoordinateY - window.constants.BIG_PIN_HALF) + ', ' + pinCoordinateX;
    adressInput.setAttribute('placeholder', newCoordinate);
  }

  function dragAndDropOfMainPin(evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = dragAndDropLimitationsX(shift);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function dragAndDropLimitationsX(shift) {
      if (mainPin.offsetLeft > 0) {
        var coordinatesX = (mainPin.offsetLeft - shift.x) + 'px';
      } else {
        coordinatesX = (mainPin.offsetLeft + shift.x + 15) + 'px';
      }
      return coordinatesX;
    }
  }

  function generatePinsFromTemplate() {
    var pinsData = window.dataGenerator.generatePinsData();
    var pinsFragment = renderPins(pinsData);
    mapPins.appendChild(pinsFragment);
  }

  function initOnMouseDown() {
    unlockPin();
    generatePinsFromTemplate();

    mainPin.removeEventListener('mousedown',initOnMouseDown);
  }

  function init() {
    mainPin.addEventListener('mousedown',initOnMouseDown);
    mainPin.addEventListener('mousedown', function (evt) {
      dragAndDropOfMainPin(evt);
      setCoordinatesOfMainPin();
    });
  }

  window.pin = {
    init: init,
  };

})();