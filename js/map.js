'use strict';

(function () {
  var clsHidden = 'hidden';
  var tokyo = document.querySelector('.tokyo');
  var offerDialog = tokyo.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  window.openCloseHandler.closeDialog(offerDialog, dialogClose, clsHidden);


  var listHotels = window.data.generateListLodging();
  window.pin.renderPins(listHotels);
  var pins = tokyo.querySelectorAll('.pin:not(.pin__main)');
  for (var i = pins.length; i--;) {
    window.openCloseHandler.openDialog(offerDialog, pins[i], clsHidden, listHotels);
  }


  var form = document.querySelector('.notice__form');
  var lodgingType = form.querySelector('#type');
  var price = form.querySelector('#price');
  var priceTypeHotel = {
    'flat': 1000,
    'house': 10000,
    'bungalo': 0
  };
  window.form.setMinPrice(lodgingType, price, priceTypeHotel);

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
  window.form.setTime(time, timeOut);
  window.form.setTime(timeOut, time);


  var button = form.querySelector('.form__submit');
  var inputs = form.querySelectorAll('input[required]');
  var inputTitle = form.querySelector('#title');
  var inputPrice = form.querySelector('#price');
  window.form.validityForm(form, button, inputs, inputTitle, inputPrice);


  var pinMain = tokyo.querySelector('.pin__main');
  var offsetTop = 150;
  var offsetBottom = 50;
  window.drag.moveElement(pinMain, tokyo, offsetBottom, offsetTop);
})();
