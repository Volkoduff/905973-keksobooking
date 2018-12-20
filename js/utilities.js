'use strict';
(function () {
  // Массив строк произвольной длинны
  function getRandomLengthArray(array) {
    var generatedArrayOfFeatures = getShuffleArray(array);
    var randomFinishIndex = getRandomMinMaxNumber(1, array.length);
    generatedArrayOfFeatures = array.slice(1, randomFinishIndex);
    return generatedArrayOfFeatures;
  }

  // Возвращает произвольный элемент из массива
  function getRandomArrayElement(array) {
    var randomArray = Math.floor(Math.random() * array.length);
    return array[randomArray];
  }

  function getShuffleArray(array) {
    function compareRandom() {
      return Math.random() - 0.5;
    }
    array.sort(compareRandom);
    return array;
  }

  function getRandomMinMaxNumber(min, max) {
    var randomMinMaxNum = Math.floor(Math.random() * (max - min) + min);
    return randomMinMaxNum;
  }

  window.utilities = {
    getRandomLengthArray: getRandomLengthArray,
    getRandomArrayElement: getRandomArrayElement,
    getShuffleArray: getShuffleArray,
    getRandomMinMaxNumber: getRandomMinMaxNumber,
  };
})();