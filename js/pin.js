'use strict';
(function() {
  var mainPin = document.querySelector('.map__pin');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fade = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldSet = document.querySelectorAll('.ad-form__element');

  function unlockPin() {
    for (i = 0; i < fieldSet.length; i++) {
      fade.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      fieldSet[i].removeAttribute('disabled', 'disabled');
      mainPin.removeEventListener('mouseup', function() {
        unlockPin();
      });
    }
  }
  function setDisableToForms() {
    for (var i = 0; i < fieldSet.length; i++) {
      fieldSet[i].setAttribute('disabled', 'disabled');
    }
  }

  function renderPin(pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.dataset.pinId = i;
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

  // function renderPins() {
  //   for (i = 0; i < pinsData.length; i++) {
  //     pinFragment.appendChild(renderPin(pinsData[i]));
  //   }
  //   return pinFragment;
  // }

  // function generatePinsFromTemplate() {
  //   mapPin.appendChild(pinFragment);
  // }

  // function setCoordinatesOfMainPin() {
  //   var pinCoordinateY = mainPin.offsetTop;
  //   var pinCoordinateX = mainPin.offsetLeft;
  //   var newCoordinate = (pinCoordinateY - window.constants.BIG_PIN_HALF) + ', ' + pinCoordinateX;
  //   adressInput.setAttribute('placeholder', newCoordinate);
  // }
  window.pin = {
    unlockPin: unlockPin,
    setDisableToForms: setDisableToForms,
    renderPin: renderPin,
    mainPin: mainPin,
  };

})();
