var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PIN = 65;
var MAP_WIDTH = 1200;
var MAP_HEIGH = 704;
var MAP_HEIGH_MIN = 130;
var MAP_HEIGH_MAX = 630;
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var randomX = getRandomMinMaxNum(PIN, MAP_WIDTH - PIN);
var randomY = getRandomMinMaxNum(MAP_HEIGH_MIN, MAP_HEIGH_MAX);

function getRandomMinMaxNum(min, max) {
    var randomMinMaxNum = Math.floor(Math.random() * (max - min) + min);
    return randomMinMaxNum;
};

function getConsistentMinMaxNum(min, max) {
    for (var i = min; i < max; i++) {
        consistentMinMaxNum += i;
    }
    return consistentMinMaxNum;
};

function getRandomArr(arr) {
    var randomArr = Math.floor(Math.random() * arr.length);
    return randomArr;
};

// Массив выводящий последовательно
function getConsistentArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        consistentArr += i;
    }
    return consistentArr;
};

// Массив строк в произвольном порядке
function getRandomPositionArr(arr) {
    function compareRandom(a, b) {
        return Math.random() - 0.5;
    }
    arr.sort(compareRandom);
    return arr;
};

// Массив строк произвольной длинны
function getRandomArr(FEATURES) {
    var featuresGeneric = []
    var featuresRandomStringQuantity = getRandomMinMaxNum(1, FEATURES.length);
    for (var i = 0; i < featuresRandomStringQuantity; i++) {
        featuresGeneric.push(FEATURES[i]);
    }
    return featuresGeneric[];

};

var offerObj = {
    author: {
        avatarIndex = '0' + getConsistentMinMaxNum(1, 8);
        avatar: 'img/avatars/user' + 'avatarIndex' + '.png';
    },
    offer: {
        title: getConsistentArr(TITLE);
        address: 'randomY' + ', ' + 'randomX';
        price: getRandomMinMaxNum(1000, 1000000);
        type: getRandomArr(TYPE);
        rooms: getRandomMinMaxNum(1, 5);
        guests: getRandomMinMaxNum(1, 2);
        checkin: getRandomArr(CHECKIN);
        checkout: getRandomArr(CHECKOUT);
        features: getRandomArr(arr);
        description: '';
        photos: getRandomPositionArr(PHOTOS);
    },
    location: {
        x: randomX;
        y: randomY;
    }
};


var fade = document.querySelector('.map');
fade.classList.remove('map--faded');





// var wizards = [];

// for (var i = 0; i <= 3; i++) {
//     var randomNameSurname = getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES);
//     var randomCoat = getRandomElement(WIZARD_COAT);
//     var randomEyes = getRandomElement(WIZARD_EYES);
//     wizardObj = {
//         name: randomNameSurname,
//         coatColor: randomCoat,
//         eyesColor: randomEyes
//     };
//     wizards.push(wizardObj);
// };