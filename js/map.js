'use strict';

window.map = (function () {
  window.data.loadListLodgin();
  var tokyo = document.querySelector('.tokyo');
  var form = document.querySelector('.notice__form');
  var lodgingType = form.querySelector('#type');
  var inputPrice = form.querySelector('#price');
  var priceTypeLodge = {
    'flat': 1000,
    'house': 10000,
    'bungalo': 0
  };
  window.form.setMinPrice(lodgingType, inputPrice, priceTypeLodge);

  var roomNumber = form.querySelector('#room_number');
  var roomCapacity = form.querySelector('#capacity');
  var roomList = {
    'room_1': 'guest_0',
    'room_2': 'guest_3',
    'room_3': 'guest_3'
  };
  window.form.setCountGuests(roomNumber, roomCapacity, roomList);

  var timeOut = form.querySelector('#timeout');
  var time = form.querySelector('#time');
  var timeList = {
    '12': '12',
    '13': '13',
    '14': '14'
  };
  window.form.setTime(time, timeOut, timeList);
  window.form.setTime(timeOut, time, timeList);


  var button = form.querySelector('.form__submit');
  var inputs = form.querySelectorAll('input[required]');
  var inputTitle = form.querySelector('#title');
  var inputAddress = document.querySelector('#address');
  var pinMain = tokyo.querySelector('.pin__main');
  window.form.validityForm(form, button, inputs, inputTitle, inputPrice, inputAddress, pinMain);


  var offsetTop = 150;
  var offsetBottom = 50;
  window.drag.moveElement(pinMain, tokyo, offsetBottom, offsetTop, inputAddress);
  window.form.dragPinMain(inputAddress, pinMain);
})();
