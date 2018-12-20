'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var form = document.querySelector('.ad-form__submit');
  var templateOfSuccessMessage = document.querySelector('#success').content.querySelector('.success');
  var messageText = document.querySelector('.success__message');
  
  function upload(data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };


  // form.addEventListener('submit', function (evt) {
  //   window.upload(new FormData(form), function (response) {
  //     getSuccessMessage();
  //     renderMessage();
  //   });
  //   evt.preventDefault();
  // });

  // function getSuccessMessage() {
  //   var successMessage = templateOfSuccessMessage.cloneNode(true);
  //   return successMessage;
  // }
  
  // function renderMessage () {
  //   var message = document.createDocumentFragment();
  //   pinFragment.appendChild(successMessage);
  //   return message;
  // }

    form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function() {

    });
  });

  window.upload = {
    upload: upload,
  }
})();
