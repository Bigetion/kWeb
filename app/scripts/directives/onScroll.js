(function () {
  'use strict';
  App.directive("onScrollBottom", function () {
    var raw;
    var lastScrollTop = 0;
    var idElement;
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        raw = elem[0];
        elem.bind("scroll", function (event) {
          if (attrs.id != idElement) {
            raw = elem[0];
          }

          var st = event.target.scrollTop;

          if (st > lastScrollTop) {
            if (raw.scrollTop + raw.offsetHeight + 0 >= raw.scrollHeight) {
              idElement = attrs.id;
              scope.$apply(attrs.onScrollBottom);
            }
          }

          lastScrollTop = st;
        });
      }
    }
  }).directive('tableScrollbar', ['$parse', '$window', '$interval', '$timeout', function ($parse, $window, $interval, $timeout) {
    return {
      restrict: 'EA',
      transclude: true,
      template: '<div style="overflow-x:auto"><div ng-transclude></div></div>',
      replace: true,
      link: function ($scope, $elem, $attr) {
        var jqWindow = angular.element($window);

        var getTHeadWidth = function () {
          var tTable = angular.element($elem.querySelectorAll('table'));

          var tHead = angular.element(tTable[0]);
          var tBody = angular.element(tTable[1]);

          tHead.attr('style', 'padding-right:17px');
          tBody.parent().attr('style', 'width: '+(tHead[0].clientWidth)+'px !important;max-height: 300px; overflow-y:auto !important;overflow-x:hidden');

          var tHeadTr = angular.element(tHead.querySelectorAll('tr'));

          var getTBodyTr = function () {
            var tBodyTr = angular.element(tBody.querySelectorAll('tr'));
            if (tBodyTr.length > 0) {
              angular.forEach(tBodyTr[0].cells, function (cell, i) {
                cell.width = tHeadTr[0].cells[i].clientWidth;
              });
            } else {
              $timeout(getTBodyTr, 1);
            }
          }
          getTBodyTr();
        }

        getTHeadWidth();

        angular.element($window).bind('resize', function () {
          getTHeadWidth();
          $scope.$digest();
        });
      }
    };
  }]);
})();