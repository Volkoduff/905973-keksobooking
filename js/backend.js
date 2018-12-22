'use strict';

(function () {
  function downloadData(url, onSuccess) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('GET', URL);
    xhr.send();
  }

  function uploadData(data, onSuccess) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

  window.backend = {
    downloadData: downloadData,
    uploadData: uploadData,
  };

})();
