'use strict';

var adressInput = document.getElementById('address');
// var timeInField = document.getElementById('timein');
// var timeOutField = document.getElementById('timeout');

/* /////////////////////////querySelector///////////////////////// */

var mapPin = document.querySelector('.map__pins');


/* /////////////////////////область вызова инструкций///////////////////////// */
var pinsData = [];

window.pin.mainPin.addEventListener('mouseup', function () {
  window.pin.unlockPin();
});

window.forms.formInit();

window.pin.mainPin.addEventListener('mousedown', dragAndDropOfMainPin);

window.pin.setDisableToForms();

window.pin.mainPin.addEventListener('mousedown', function () {
  setCoordinatesOfMainPin();
  generatePinsFromTemplate();
});

// присвоили массив функции

// renderPins(pinsData);
// var pinFragment = document.createDocumentFragment();
// pinFragment = renderPins();
// pinsData = window.dataGenerator.generateDataArray(pinsData);


window.dataGenerator.generateDataArray();

var pinFragment = document.createDocumentFragment();
renderPins();


/* /////////////////////////область объявления функций///////////////////////// */

function renderPins() {
  for (var i = 0; i < pinsData.length; i++) {
    pinFragment.appendChild(window.pin.renderPin(pinsData[i]));
  }
  return pinFragment;
}
function generatePinsFromTemplate() {
  mapPin.appendChild(pinFragment);
}

function setCoordinatesOfMainPin() {
  var pinCoordinateY = window.pin.mainPin.offsetTop;
  var pinCoordinateX = window.pin.mainPin.offsetLeft;
  var newCoordinate = (pinCoordinateY - window.constants.BIG_PIN_HALF) + ', ' + pinCoordinateX;
  adressInput.setAttribute('placeholder', newCoordinate);
}

function dragAndDropOfMainPin(evt) {
  window.pin.unlockPin();
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
    window.pin.mainPin.style.top = (window.pin.mainPin.offsetTop - shift.y) + 'px';
    window.pin.mainPin.style.left = dragAndDropLimitationsX(shift);
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function dragAndDropLimitationsX(shift) {
    if (window.pin.mainPin.offsetLeft > 0) {
      var coordinatesX = (window.pin.mainPin.offsetLeft - shift.x) + 'px';
    } else {
      coordinatesX = (window.pin.mainPin.offsetLeft + shift.x + 15) + 'px';
    }
    return coordinatesX;
  }
}

