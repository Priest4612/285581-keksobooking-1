'use strict';

window.map = (function () {
  var clsHidden = 'hidden';
  var tokyo = document.querySelector('.tokyo');
  var offerDialog = tokyo.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  // var listLodging = window.data.generateListLodgin();
  var listLodging = window.data.loadListLodgin();
  window.pin.renderPins.call(window.map, listLodging);
  window.showCard.closeDialogHandler(offerDialog, dialogClose, clsHidden);
  var pins = tokyo.querySelectorAll('.pin:not(.pin__main)');
  for (var i = pins.length; i--;) {
    window.showCard.openDialogHadler(offerDialog, pins[i], clsHidden, listLodging);
  }


  var form = document.querySelector('.notice__form');
  var lodgingType = form.querySelector('#type');
  var price = form.querySelector('#price');
  var priceTypeLodge = {
    'flat': 1000,
    'house': 10000,
    'bungalo': 0
  };
  window.form.setMinPrice(lodgingType, price, priceTypeLodge);

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
  var inputPrice = form.querySelector('#price');
  window.form.validityForm(form, button, inputs, inputTitle, inputPrice);

  var pinMain = tokyo.querySelector('.pin__main');
  var offsetTop = 150;
  var offsetBottom = 50;
  var address = document.querySelector('#address');
  window.drag.moveElement(pinMain, tokyo, offsetBottom, offsetTop, address);
})();
