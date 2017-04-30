'use strict';

window.form = (function () {
  var module = {};

  var syncValue = {
    price: function (evt, element, obj) {
      var targetValue = evt.currentTarget.value;
      element.value = obj[targetValue];
      element.min = obj[[targetValue]];
    },
    value: function (evt, element, obj) {
      var targetValue = evt.currentTarget.value;
      element.value = obj[targetValue];
    }
  };

  module.setTime = function setTime(activator, element, obj) {
    window.synchronizeFields(activator, element, obj, syncValue.value);
  };


  module.setCountGuests = function setCountGuests(activator, element, obj) {
    window.synchronizeFields(activator, element, obj, syncValue.value);
  };

  module.setMinPrice = function setMinPrice(activator, element, obj) {
    window.synchronizeFields(activator, element, obj, syncValue.price);
  };


  var CustomValidation = function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];

    this.inputNode = input;
    this.registerListener();
  };

  CustomValidation.prototype = {
    addInvalidity: function addInvalidity(message) {
      this.invalidities.push(message);
    },
    getInvalidities: function getInvalidities() {
      return this.invalidities.join('. \n');
    },
    checkValidity: function checkValidity(input) {
      for (var i = 0; i < this.validityChecks.length; i++) {
        var isInvalid = this.validityChecks[i].isInvalid(input);
        if (isInvalid) {
          this.addInvalidity(this.validityChecks[i].invalidityMessage);
        }

        var requirementElement = this.validityChecks[i].element;

        if (requirementElement) {
          if (isInvalid) {
            requirementElement.classList.add('invalid');
            requirementElement.classList.remove('valid');
          } else {
            requirementElement.classList.remove('invalid');
            requirementElement.classList.add('valid');
          }
        }
      }
      if (this.invalidities.length) {
        input.classList.add('invalid');
        input.classList.remove('valid');
      } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
      }
    },
    checkInput: function checkInput() {
      this.inputNode.CustomValidation.invalidities = [];
      this.checkValidity(this.inputNode);

      if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
        this.inputNode.setCustomValidity('');
      } else {
        var message = this.inputNode.CustomValidation.getInvalidities();
        this.inputNode.setCustomValidity(message);
      }
    },
    registerListener: function registerListener() {
      var CustomerValidation = this;
      this.inputNode.addEventListener('keyup', function () {
        CustomerValidation.checkInput();
      });
    }
  };

  var lodgingTitleValidityChecks = [
    {
      isInvalid: function isInvalid(input) {
        return input.value.length < 30;
      },
      invalidityMessage: 'Название должно быть не короче 30 знаков',
      element: document.querySelector('label[for="title"] .input-requirements li:nth-child(1)')
    },
    {
      isInvalid: function isInvalid(input) {
        return input.value.length > 100;
      },
      invalidityMessage: 'Название должно быть короче 100 знаков',
      element: document.querySelector('label[for="title"] .input-requirements li:nth-child(2)')
    },
  ];

  var lodgingPriceValidityChecks = [
    {
      isInvalid: function isInvalid(input) {
        return parseInt(input.min, 10) > parseInt(input.value, 10);
      },
      invalidityMessage: 'Цена меньше разрешенной',
      element: document.querySelector('label[for="price"] .input-requirements li:nth-child(1)')
    },
    {
      isInvalid: function isInvalid(input) {
        return (parseInt(input.max, 10) < parseInt(input.value, 10));
      },
      invalidityMessage: 'Цена больше разрешенной',
      element: document.querySelector('label[for="price"] .input-requirements li:nth-child(2)')
    }
  ];

  var paramAddres = {
    minX: 38.5,
    maxX: 1200,
    minY: 150,
    maxY: 650
  };
  var regexp = /\d{1,4}\.?\d?/g;

  var lodgingAddressValidityChecks = [
    {
      isInvalid: function isInvalid(input) {
        return input.value.length === 0;
      },
      invalidityMessage: 'Введите адрес',
      element: document.querySelector('label[for="address"] .input-requirements li:nth-child(1)')
    },
    {
      isInvalid: function isInvalid(input) {
        var arrCoord = input.value.match(regexp);
        return arrCoord === null ? true : arrCoord.length !== 2;
      },
      invalidityMessage: 'Введите 2 координаты',
      element: document.querySelector('label[for="address"] .input-requirements li:nth-child(2)')
    },
    {
      isInvalid: function isInvalid(input) {
        var coordX;
        var coord = input.value.match(regexp);
        var coordLength = coord === null ? 0 : coord.length;
        if (coordLength >= 1) {
          coordX = coord[0];
        } else {
          coordX = -1;
        }
        return coordX < paramAddres.minX || coordX > paramAddres.maxX;
      },
      invalidityMessage: 'Величина X должна быть от 38.5 до 1200',
      element: document.querySelector('label[for="address"] .input-requirements li:nth-child(3)')
    },
    {
      isInvalid: function isInvalid(input) {
        var coordY;
        var coord = input.value.match(regexp);
        var coordLength = coord === null ? 0 : coord.length;
        if (coordLength >= 2) {
          coordY = coord[1];
        } else {
          coordY = -1;
        }
        return coordY <= paramAddres.minY || coordY >= paramAddres.maxY;
      },
      invalidityMessage: 'Величина Y должна быть от 150 до 650',
      element: document.querySelector('label[for="address"] .input-requirements li:nth-child(4)')
    },
  ];

  var validityTitle = function validityTitle(inputTitle) {
    inputTitle.CustomValidation = new CustomValidation(inputTitle);
    inputTitle.CustomValidation.validityChecks = lodgingTitleValidityChecks;
  };
  var validityPrice = function validityPrice(inputPrice) {
    inputPrice.CustomValidation = new CustomValidation(inputPrice);
    inputPrice.CustomValidation.validityChecks = lodgingPriceValidityChecks;
  };
  var validityAddress = function validityAddres(inputAddress, pinMain) {
    inputAddress.CustomValidation = new CustomValidation(inputAddress);
    inputAddress.CustomValidation.validityChecks = lodgingAddressValidityChecks;
  };

  var validate = function validate(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].CustomValidation.checkInput();
    }
  };

  module.validityForm = function validityForm(form, button, inputs, inputTitle, inputPrice, inputAddress, pinMain) {
    validityTitle(inputTitle);
    validityPrice(inputPrice);
    validityAddress(inputAddress, pinMain);
    button.addEventListener('click', function () {
      validate(inputs);
    });
    form.addEventListener('submit', function () {
      validate(inputs);
    });
  };

  module.dragPinMain = function (inputAddress, pinMain) {
    inputAddress.addEventListener('blur', function () {
      var coord = inputAddress.value.match(regexp);
      pinMain.style.left = (coord === null) ? pinMain.offsetLeft + 'px' : coord[0] + 'px';
      pinMain.style.top = (coord === null) ? pinMain.offsetTop + 'px' : coord[1] + 'px';
      window.drag.setInputAddress(inputAddress, pinMain);
    });
  };

  return module;
})();
