'use strict';

window.filter = (function filter() {
  var module = {};
  var filters = document.querySelector('.tokyo__filters');

  var ANY = 'any';
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var VALUE_LOW = 'low';
  var VALUE_MIDDLE = 'middle';
  var VALUE_HIGH = 'high';

  var priceSelect = filters.querySelector('#housing_price');
  var priceFilter = function (author) {
    var selectedPrice = priceSelect.options[priceSelect.selectedIndex].value;
    switch (selectedPrice.toLowerCase()) {
      case VALUE_LOW:
        return author.offer.price < PRICE_LOW;
      case VALUE_MIDDLE:
        return PRICE_LOW <= author.offer.price && author.offer.price <= PRICE_HIGH;
      case VALUE_HIGH:
        return author.offer.price > PRICE_HIGH;
    }
    return true;
  };

  var houseType = filters.querySelector('#housing_type');
  var houseTypeFilter = function houseTypeFilter(obj) {
    return houseType.value === ANY ? true : obj.offer.type === houseType.value;
  };

  var housingRoomNumber = filters.querySelector('#housing_room-number');
  var roomsFilter = function roomsFilter(obj) {
    return housingRoomNumber.value === ANY ? true : obj.offer.rooms === +housingRoomNumber.value;
  };


  var housingGuestsNumber = filters.querySelector('#housing_guests-number');
  var guestsFilter = function (obj) {
    return housingGuestsNumber.value === ANY ? true : obj.offer.guests === +housingGuestsNumber.value;
  };


  var housingFeatures = filters.querySelector('#housing_features');
  var featuresFilter = function (obj) {
    var featuresChecked = housingFeatures.querySelectorAll('.feature input:checked');

    return Array.prototype.every.call(featuresChecked, function (it) {
      return ~obj.offer.features.indexOf(it.value);
    });
  };

  module.filterData = function (data) {
    return data.filter(houseTypeFilter)
      .filter(priceFilter)
      .filter(roomsFilter)
      .filter(guestsFilter)
      .filter(featuresFilter);
  };


  return module.filterData;
})();
