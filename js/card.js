'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('article');

  function deleteCardIfItIsCreated() {
    var cardToDelete = document.querySelector('.map__card');
    if (cardToDelete !== null) {
      cardToDelete.remove();
    }
  }

  function refreshCard(pin) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = pin.titleArray;
    cardElement.querySelector('.popup__text--address').textContent = pin.address;
    cardElement.querySelector('.popup__text--price').textContent = pin.price + ' ' + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = pin.appartment;
    cardElement.querySelector('.popup__text--capacity').textContent = pin.roomGuest;
    cardElement.querySelector('.popup__text--time').textContent = pin.check;
    cardElement.querySelector('.popup__description').textContent = pin.description;
    cardElement.querySelector('.popup__avatar').src = pin.source;
    var listElement = cardElement.querySelector('.popup__features');
    listElement.innerHTML = '';

    for (var j = 0; j < pin.features.length; j++) {
      var newElement = document.createElement('li');
      newElement.classList.add('popup__feature');
      newElement.classList.add('popup__feature--' + pin.features[j]);
      listElement.appendChild(newElement);
    }

    var oldPhotoElement = cardElement.querySelector('.popup__photos');
    oldPhotoElement.innerHTML = '';

    for (var photoIndex = 0; photoIndex < pin.photosSrc.length; photoIndex++) {
      createPhotoElement(cardElement, photoIndex, pin, oldPhotoElement);
    }

    addCardHandlers(cardElement);
    return cardElement;
  }

  function createPhotoElement(cardElement, photoIndex, pin, oldPhotoElement) {
    var newPhotoElement = cardElement.querySelector('.popup__photo');
    newPhotoElement = document.createElement('img');
    newPhotoElement.src = pin.photosSrc[photoIndex];
    newPhotoElement.alt = 'Фотография жилья';
    newPhotoElement.style.width = '45px';
    newPhotoElement.style.height = '40px';
    newPhotoElement.classList.add('popup__photo');
    oldPhotoElement.appendChild(newPhotoElement);
  }

  function addCardHandlers(cardElement) {
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      cardElement.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        cardElement.classList.add('hidden');
      }
    });
  }

  function createPopupCard(evt, pinData) {
    var beforeTag = document.querySelector('.map__filters-container');
    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(refreshCard(pinData));
    beforeTag.parentNode.insertBefore(fragmentCard, beforeTag);
  }

  window.card = {
    deleteCardIfItIsCreated: deleteCardIfItIsCreated,
    createPopupCard: createPopupCard,
  };

})();
