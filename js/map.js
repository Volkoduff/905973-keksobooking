'use strict';

var adressInput = document.getElementById('address');
var timeInField = document.getElementById('timein');
var timeOutField = document.getElementById('timeout');

/* /////////////////////////querySelector///////////////////////// */
var fade = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldSet = document.querySelectorAll('.ad-form__element');
var mainPin = document.querySelector('.map__pin');
var mapPin = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


/* /////////////////////////область вызова инструкций///////////////////////// */
var pinsData = [];

mainPin.addEventListener('mouseup', function () {
  unlockPin();
});

window.forms.formInit();

mainPin.addEventListener('mousedown', dragAndDropOfMainPin);

timeInField.onchange = function (event) {
  timeInField.value = event.target.value;
  timeOutField.value = event.target.value;
};

for (var i = 0; i < fieldSet.length; i++) {
  fieldSet[i].setAttribute('disabled', 'disabled');
}

mainPin.addEventListener('mousedown', function () {
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

function unlockPin() {
  for (i = 0; i < fieldSet.length; i++) {
    fade.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    fieldSet[i].removeAttribute('disabled', 'disabled');
    mainPin.removeEventListener('mouseup', function () {
      unlockPin();
    });
  }
}

function renderPin(pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.dataset.pinId = i;
  pinElement.style = pin.location;
  pinElement.querySelector('img').src = pin.source;
  pinElement.querySelector('img').alt = pin.titleArray;
  pinElement.addEventListener('click', function () {
    window.card.deleteCardIfItIsCreated();
  });
  pinElement.addEventListener('click', function (evt) {
    window.card.createPopupCard(evt, pin);
  });
  return pinElement;
}


function renderPins() {
  for (i = 0; i < pinsData.length; i++) {
    pinFragment.appendChild(renderPin(pinsData[i]));
  }
  return pinFragment;
}
function generatePinsFromTemplate() {
  mapPin.appendChild(pinFragment);
}

function setCoordinatesOfMainPin() {
  var pinCoordinateY = mainPin.offsetTop;
  var pinCoordinateX = mainPin.offsetLeft;
  var newCoordinate = (pinCoordinateY - window.constants.BIG_PIN_HALF) + ', ' + pinCoordinateX;
  adressInput.setAttribute('placeholder', newCoordinate);
}

function dragAndDropOfMainPin(evt) {
  unlockPin();
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

