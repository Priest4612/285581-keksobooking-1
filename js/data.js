'use strict';
window.data = (function () {
  var module = {};
  var getUniqueElement = function getUniqueElement(arr) {
    var elem;
    while (!elem) {
      var indexArr = window.randomizer.getNumberRnd(arr.length - 1);
      elem = arr[indexArr];
    }
    elem = arr.splice(indexArr, 1);
    return elem[0];
  };

  var getElementArray = function getElementArray(arr) {
    return arr[window.randomizer.getNumberRnd(arr.length - 1)];
  };
  var createNewArray = function createNewArray(arr, length) {
    var newArray = [];
    var arrCopy = arr.slice();
    for (var i = length; i--;) {
      var elem = getUniqueElement(arrCopy);
      while (!elem) {
        elem = getUniqueElement(arrCopy);
      }
      newArray.push(elem);
    }
    return newArray;
  };

  var listNumAvatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var listTitle = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var typeLodging = ['flat', 'house', 'bungalo'];
  var listTime = ['12:00', '13:00', '14:00'];
  var listFeatures = ['wifi', 'dishwasher', 'parking', 'washer',
    'elevator', 'conditioner'];

  var minX = 300;
  var maxX = 900;
  var pinX = 56 / 2;
  var minY = 100;
  var maxY = 500;
  var pinY = 75 / 2;

  var minPrice = 1000;
  var maxPrice = 1000000;

  var minRooms = 1;
  var maxRooms = 5;


  var generateLodging = function generateLodging() {
    var lodging = {};
    var author = {};
    author.avatar = 'img/avatars/user' + getUniqueElement(listNumAvatars) + '.png';

    var location = {};
    location.x = window.randomizer.getNumberRangeRnd(minX, maxX) + pinX;
    location.y = window.randomizer.getNumberRangeRnd(minY, maxY) + pinY;

    var offer = {};
    offer.title = getUniqueElement(listTitle);
    offer.address = location.x + ', ' + location.y;
    offer.price = window.randomizer.getNumberRangeRnd(minPrice, maxPrice);
    offer.type = getElementArray(typeLodging);
    offer.rooms = window.randomizer.getNumberRangeRnd(minRooms, maxRooms);
    offer.guests = offer.rooms * 2;
    offer.checkin = getElementArray(listTime);
    offer.checkout = getElementArray(listTime);
    offer.features = createNewArray(listFeatures, window.randomizer.getNumberRnd(listFeatures.length));
    offer.description = '';
    offer.photos = [];

    lodging.author = author;
    lodging.offer = offer;
    lodging.location = location;

    return lodging;
  };

  module.offers = [];
  module.generateListLodgin = function generateListLodgin() {
    for (var i = listNumAvatars.length; i--;) {
      module.offers.push(generateLodging());
    }
    return module.offers;
  };

  // var self = window.data;
  var loadData = function loadData(data, message) {
    data.forEach(function (obj) {
      module.offers.push(obj);
    });
    // for (var i = data.length; i--;) {
    //   module.offers.push(generateLodging());
    // }
    // module.offers = data;
    console.log(message);
  };

  var loadError = function loadError(message) {
    console.log(message);
  };

  var getLoadData = function getLoadData() {
    var DATA_URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
    var load = window.load;
    load(DATA_URL, loadData, loadError);
  };

  module.loadListLodgin = function loadListLodgin() {
    getLoadData();
    return module.offers;
  };


  return module;
})();
