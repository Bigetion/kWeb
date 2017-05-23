(function () {
  'use strict';
  App.directive('bootDatepicker', function ($compile, $filter) {
    return {
      restrict: 'E',
      require: '^ngModel',
      scope: {
        ngModel: '=',
        maxDate: '=',
        minDate: '=',
        format: '@',
        disabled: '='
      },
      template: '<p class="input-group">\
          <span class="input-group-btn">\
            <button type="button" class="btn btn-default" ng-click="isOpenClick(true)"><i class="glyphicon glyphicon-calendar"></i></button>\
          </span>\
          <input type="text" style="min-width:100px" class="form-control" uib-datepicker-popup="{{format}}" readonly="readonly" show-button-bar="false" ng-model="ngModel" is-open="popup.opened" datepicker-options="dateOptions" ng-required="ngRequired" close-text="Close"/>\
        </p>',
      link: function (scope, element, attr, ctrl) {
        scope.popup = {
          opened: false
        };
        scope.isOpenClick = function (condition) {
          scope.popup.opened = condition;
        }

        if(!attr.format){
          scope.format = "dd-MM-yyyy";
        }

        scope.dateOptions = {
          dateDisabled: scope.disabled,
          formatYear: 'yy',
          maxDate: scope.maxDate || new Date(9999, 12, 31),
          minDate: scope.minDate || new Date(),
          startingDay: 1,
          showButtonBar: false
        }

        scope.$watch('maxDate', function () {
          scope.dateOptions.maxDate = scope.maxDate || new Date(9999, 12, 31);
          scope.dateOptions.minDate = scope.minDate || new Date();
        });

        scope.$watch('minDate', function () {
          scope.dateOptions.maxDate = scope.maxDate || new Date(9999, 12, 31);
          scope.dateOptions.minDate = scope.minDate || new Date();
        });
        // element.replaceWith($compile('<p class="input-group">\
        //   <input type="text" class="form-control" uib-datepicker-popup ng-model="$parent.ngModel" is-open="$parent.popup.opened" datepicker-options="$parent.dateOptions" ng-required="$parent.ngRequired" close-text="Close"/>\
        //   <span class="input-group-btn">\
        //     <button type="button" class="btn btn-default" ng-click="$parent.isOpenClick(true)"><i class="glyphicon glyphicon-calendar"></i></button>\
        //   </span>\
        // </p>')(scope));
      }
    };
  })
})();