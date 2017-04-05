'use strict';
window.generateListHotels = (function () {
  var getUniqueElement = function (arr) {
    var elem;
    return function () {
      while (!elem) {
        var indexArr = window.utils.randomizer(arr.length);
        elem = arr[indexArr];
      }
      elem = arr.splice(indexArr, 1);
      return elem[0];
    }();
  };

  var getElementArray = function (arr) {
    return arr[window.utils.randomizer(arr.length - 1)];
  };
  var createNewArray = function (arr, length) {
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
  var typeHotel = ['flat', 'house', 'bungalo'];
  var listTime = ['12:00', '13:00', '14:00'];
  var listFeatures = ['wifi', 'dishwasher', 'parking', 'washer',
    'elevator', 'conditioner'];
  var minX = 300;
  var maxX = 900;
  var minY = 100;
  var maxY = 500;
  var minPrice = 1000;
  var maxPrice = 1000000;
  var minRooms = 1;
  var maxRooms = 5;


  var generateHotel = function () {
    var hotel = {};
    var author = {};
    author.avatar = 'img/avatars/user' + getUniqueElement(listNumAvatars) + '.png';

    var location = {};
    location.x = window.utils.randomizer(minX, maxX);
    location.y = window.utils.randomizer(minY, maxY);

    var offer = {};
    offer.title = getUniqueElement(listTitle);
    offer.address = location.x + ', ' + location.y;
    offer.price = window.utils.randomizer(minPrice, maxPrice);
    offer.type = getElementArray(typeHotel);
    offer.rooms = window.utils.randomizer(minRooms, maxRooms);
    offer.guests = offer.rooms * 2;
    offer.checkin = getElementArray(listTime);
    offer.checkout = getElementArray(listTime);
    offer.features = createNewArray(listFeatures, window.utils.randomizer(listFeatures.length));
    offer.description = '';
    offer.photos = [];

    hotel.author = author;
    hotel.offer = offer;
    hotel.location = location;

    return hotel;
  };


  var generateListHotels = function () {
    var listHotels = [];
    for (var i = listNumAvatars.length; i--;) {
      listHotels.push(generateHotel());
    }
    return listHotels;
  };

  return generateListHotels;
})();
