(function () {
  'use strict';
  App.directive("mdAuto",
    function ($compile) {
      function compile(tElement) {
        tElement.attr("onkeydown", "return false");
        tElement.attr("auto-open", "");
        var sublink = $compile(tElement, null, 1500);

        function link($scope) {
          sublink($scope);
        }

        return (link);
      }

      return ({
        compile: compile,
        priority: 1500,
        restrict: "A",
        terminal: true
      });
    }).directive('autoOpen', function () {
      return {
        require: 'mdDatepicker',
        restrict: 'A',
        priority: -1,
        compile: function compile(tElement) {
          tElement.find('input').attr('ng-click', 'ctrl.onClick($event)');
          tElement.attr('ng-click', 'ctrl.onClick($event)');
          tElement.attr("onkeydown", "return false");

          return function (scope, element, attrs, datePicker) {
            datePicker.onClick = function (event) {
              datePicker.openCalendarPane(event);
            };
          };
        }
      };
    })
})();
