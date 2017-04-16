'use strict';

(function () {
  var clsHidden = 'hidden';
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  window.openCloseHandler.closeDialog(offerDialog, dialogClose, clsHidden);

  var listHotels = window.generateListHotels();
  window.renderElements.renderPins(listHotels);

  var pins = document.querySelectorAll('.pin:not(.pin__main)');
  for (var i = pins.length; i--;) {
    window.openCloseHandler.openDialog(offerDialog, pins[i], clsHidden, listHotels);
  }


  var formContent = document.querySelector('.form__content');
  var lodgingType = formContent.querySelector('#type');
  var price = formContent.querySelector('#price');
  var priceTypeHotel = {
    'flat': 1000,
    'house': 10000,
    'bungalo': 0
  };

  window.relationship.setMinPrice(lodgingType, price, priceTypeHotel);

  var roomNumber = formContent.querySelector('#room_number');
  var roomCapacity = formContent.querySelector('#capacity');
  var roomList = {
    'room_1': 'guest_0',
    'room_2': 'guest_3',
    'room_3': 'guest_3'
  };

  window.relationship.setCountGuests(roomNumber, roomCapacity, roomList);

  var timeOut = document.querySelector('#timeout');
  var time = document.querySelector('#time');

  window.relationship.setTime(time, timeOut);
  window.relationship.setTime(timeOut, time);

  var form = document.querySelector('.notice__form');
  var submit = document.querySelector('.form__submit');
  var inputs = form.querySelectorAll('input:not([type="submit"])');
  var inputTitle = form.querySelector('#title');
  var inputPrice = form.querySelector('#price');
  window.validation.validityForm(form, submit, inputs, inputTitle, inputPrice);
})();
