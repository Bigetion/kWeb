(function () {
  'use strict';
  App.directive('validateInput', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        ngModel: '='
      },
      link: function (scope, elm, attrs, ctrl) {
        if (attrs.validateInput === 'false') return;

        scope.$watch(function () {
          return ctrl.$viewValue;
        }, function (val) {
          ctrl.$setValidity('nosymbol', true);
          ctrl.$setValidity('nospace', true);
          ctrl.$setValidity('numeric', true);
          ctrl.$setValidity('email', true);
          ctrl.$setValidity('url', true);
          ctrl.$setValidity('maxValue', true);
          ctrl.$setValidity('minValue', true);

          if (!ctrl.$valid || !val) return;

          var invalid = false;
          if (attrs.isNoSymbol && !invalid) {
            if (/^[a-zA-Z0-9 ]+$/.test(val)) {
              ctrl.$setValidity('nosymbol', true);
            } else {
              ctrl.$setValidity('nosymbol', false);
              invalid = true;
            }
          }

          if (attrs.isNoSpace && !invalid) {
            if (/^[a-zA-Z0-9\d\-_.,]+$/.test(val)) {
              ctrl.$setValidity('nospace', true);
            } else {
              ctrl.$setValidity('nospace', false);
              invalid = true;
            }
          }

          if (attrs.isNumeric && !invalid) {
            if (/^[0-9]+$/.test(val)) {
              ctrl.$setValidity('numeric', true);
            } else {
              ctrl.$setValidity('numeric', false);
              invalid = true;
            }
          }

          if (attrs.isEmail && !invalid) {
            if (/^[a-z]+[a-z0-9._]+@[a-z-]+\.[a-z.]{2,5}$/.test(val)) {
              ctrl.$setValidity('email', true);
            } else {
              ctrl.$setValidity('email', false);
              invalid = true;
            }
          }

          if (attrs.isValidUrl && !invalid) {
            if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(val)) {
              ctrl.$setValidity('url', true);
            } else {
              ctrl.$setValidity('url', false);
              invalid = true;
            }
          }

          if (attrs.maxValue && !invalid) {
            if (parseInt(val) <= parseInt(attrs.maxValue)) {
              ctrl.$setValidity('maxValue', true);
            } else {
              ctrl.$setValidity('maxValue', false);
              invalid = true;
            }
          }

          if (attrs.minValue && !invalid) {
            if (parseInt(val) >= parseInt(attrs.minValue)) {
              ctrl.$setValidity('minValue', true);
            } else {
              ctrl.$setValidity('minValue', false);
              invalid = true;
            }
          }

        });
      }
    };
  }).directive('isEqual', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {

        scope.$watch(attrs.isEqual, function (newValue) {
          if (ctrl && ctrl.$modelValue) {
            if (newValue === ctrl.$modelValue) {
              ctrl.$setValidity('equal', true);
            }
            else {
              ctrl.$setValidity('equal', false);
            }
          }
        });

        ctrl.$parsers.unshift(function (viewValue) {
          if (viewValue) {
            if (viewValue === scope.$eval(attrs.isEqual)) {
              ctrl.$setValidity('equal', true);
              return viewValue;
            }
            else {
              ctrl.$setValidity('equal', false);
              return undefined;
            }
          }
          else {
            ctrl.$setValidity('equal', true);
            return viewValue;
          }
        });
      }
    };
  }).directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      scope: {
        'leadingZero': '='
      },
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var regex = !!attr.$attr.ngCurrency ? /[^0-9.,]/g : /[^0-9]/g;
            var digits = val.replace(regex, '');
            var digitsReturn = !!attr.$attr.ngCurrency ? parseFloat(digits.replace(/,/g, '')) : parseInt(digits, 10);

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return scope.leadingZero ? digits : (digitsReturn || '');
          }
          return "";
        }
        ctrl.$parsers.push(inputValue);
      }
    };
  })
})();