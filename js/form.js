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
      invalidityMessage: 'Название должго быть не короче 30 знаков',
      element: document.querySelector('label[for="title"] .input-requirements li:nth-child(1)')
    },
    {
      isInvalid: function isInvalid(input) {
        return input.value.length > 100;
      },
      invalidityMessage: 'Название должго быть короче 100 знаков',
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

  var validityTitle = function validityTitle(inputTitle) {
    inputTitle.CustomValidation = new CustomValidation(inputTitle);
    inputTitle.CustomValidation.validityChecks = lodgingTitleValidityChecks;
  };
  var validityPrice = function validityPrice(inputPrice) {
    inputPrice.CustomValidation = new CustomValidation(inputPrice);
    inputPrice.CustomValidation.validityChecks = lodgingPriceValidityChecks;
  };

  var validate = function validate(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].CustomValidation.checkInput();
    }
  };

  module.validityForm = function validityForm(form, button, inputs, inputTitle, inputPrice) {
    validityTitle(inputTitle);
    validityPrice(inputPrice);
    button.addEventListener('click', function () {
      validate(inputs);
    });
    form.addEventListener('submit', function () {
      validate(inputs);
    });
  };

  return module;
})();
