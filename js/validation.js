'use strict';

window.validation = (function () {
  var module = {};

  var CustomValidation = function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];

    this.inputNode = input;
    this.registerListener();
  };

  CustomValidation.prototype = {
	// метод объекта для добавления элемента в массив invalidities(недействительность)
    addInvalidity: function (message) {
      this.invalidities.push(message);
    },
	// метод объекта для преобразования массива invalidities(недействительность) в строку
    getInvalidities: function () {
      return this.invalidities.join('. \n');
    },

	// метод проверки валидности полей
    checkValidity: function (input) {
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

        } // end if requirementElement
      } // end for
      if (this.invalidities.length) {
        input.classList.add('invalid');
        input.classList.remove('valid');
      } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
      }
    },

    checkInput: function () {

      this.inputNode.CustomValidation.invalidities = [];
      this.checkValidity(this.inputNode);

      if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
        this.inputNode.setCustomValidity('');
      } else {
        var message = this.inputNode.CustomValidation.getInvalidities();
        this.inputNode.setCustomValidity(message);
      }
    },
    registerListener: function () {
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
      isInvalid: function (input) {
        return parseInt(input.min, 10) > parseInt(input.value, 10);
      },
      invalidityMessage: 'Цена меньше разрешенной',
      element: document.querySelector('label[for="price"] .input-requirements li:nth-child(1)')
    },
    {
      isInvalid: function (input) {
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

  module.validityForm = function validityForm(form, submit, inputs, inputTitle, inputPrice) {
    validityTitle(inputTitle);
    validityPrice(inputPrice);
    submit.addEventListener('click', function () {
      validate(inputs);
    });
    form.addEventListener('submit', function () {
      validate(inputs);
    });
  };

  return module;
})();
