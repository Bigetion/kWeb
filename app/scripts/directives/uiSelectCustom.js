(function () {
  'use strict';
  App.directive('uiSelectObject', function ($compile) {
    return {
      restrict: 'E',
      transclude: true,
      require: '^ngModel',
      scope: {
        ngModel: '=',
        data: '=',
        selectedText: '@',
        search: '@',
        placeholder: '@',
        onChange: '&',
        ngDisabled: '=?',
        ngRequired: '=?'
      },
      link: function (scope, element) {
        scope.onSelect = function () {
          scope.onChange();
        };
        element.replaceWith($compile('<ui-select ng-required="$parent.ngRequired" ng-model="$parent.ngModel" ng-disabled="$parent.ngDisabled" backspace-disabled="true" search-enabled="{{$parent.search}}" theme="select2" on-select="$parent.onSelect()">' +
          '<ui-select-match placeholder="{{$parent.placeholder}}">{{$select.selected[$parent.selectedText]}}</ui-select-match>' +
          '<ui-select-choices repeat="item in $parent.data | filter: {' + scope.selectedText + ':$select.search}">' +
          '<span ng-bind-html="item[$parent.selectedText] | highlight: $select.search"></span>' +
          '</ui-select-choices>')(scope));
      }
    };
  })

    .directive('uiSelectInfinite', ['$injector', 'lodash', function ($injector) {
      return {
        restrict: 'E',
        transclude: true,
        require: '^ngModel',
        replace: true,
        scope: {
          ngModel: '=',
          onClick: '=?',
          loadOnClick: '=?',
          service: '@',
          responseArray: '@',
          infinityValue: '=',
          inputData: '=?',
          ngDisabled: '=?',
          required: '=?',
          requiredMsg: '@?',
          placeholder: '@',
          selectValue: '@',
          selectValue2: '@',
          selectValue3: '@',
          itemValue: '@',
          itemValue2: '@',
          itemValue3: '@',
          separator: '@',
          listValue: '=?',
          onChange: '&',
          initiateData: '=?',
          noLoading: '=?',
          isInline: '=?'
        },
        template: '<div class="ui-select-infinite">' +
        '<ui-select on-select="onSelect" backspace-disabled="true" search-enabled="true" ng-required="required" ng-disabled="ngDisabled || loading" ' +
        ' ng-click="click()" ng-model="$parent.ngModel">' +
        '<ui-select-match placeholder="{{holder}}">' +
        '<span>{{$select.selected[selectValue]}}</span>' +
        '<span ng-if="selectValue2"> {{separator}} {{$select.selected[selectValue2]}}</span>' +
        '<span ng-if="selectValue3"> {{separator}} {{$select.selected[selectValue3]}}</span>' +
        '</ui-select-match>' +
        '<ui-select-choices when-scrolled="scroll($select.search,false)"  refresh="load($select.search,true)" repeat="item in listValue | filter: (selectValue ? {varFilter: $select.search} : $select.search)">' +
        '<span ng-bind-html="item[itemValue] | highlight: $select.search"></span>' +
        '<span ng-if="(itemValue2)"> {{separator}} </span>' +
        '<span ng-if="itemValue2" ng-bind-html="item[itemValue2] | highlight: $select.search"></span>' +
        '<span ng-if="(itemValue3)"> {{separator}} </span>' +
        '<span ng-if="itemValue3" ng-bind-html="item[itemValue3] | highlight: $select.search"></span>' +
        '</ui-select-choices>' +
        '</ui-select>' +
        '<span class="error-required hidden {{isInline?\'inline-error\':\'\'}}">{{requiredMsg ? requiredMsg : "Harus diisi"}}</span></div>',
        link: function (scope) {
          scope.$watch('ngModel', function () {
            if (scope.onChange) {
              scope.onChange();
            }
          });

          scope.$watch(function () {
            return scope.inputData;
          }, function () {
            scope.load('');
          }, true);
        },
        controller: ['$scope', function ($scope) {
          $scope.isLastPage = false;

          $scope.holder = 'Loading..';
          if (!$scope.noLoading) {
            $scope.loading = true;
          }
          var splitService = $scope.service.split('.');
          var service = $injector.get(splitService[0]);
          var serviceFunction = splitService[1];

          $scope.load = function (query) {
            service[serviceFunction]('1', query, $scope.inputData).then(function (response) {
              $scope.listValue = [];
              if ($scope.initiateData) {
                $scope.listValue.push($scope.initiateData);
              }
              $scope.listValue = $scope.responseArray ? $scope.listValue.concat(response[$scope.responseArray]) : $scope.listValue.concat(response);
              $scope.totalRecord = response.totalRecord;
              $scope.totalPage = response.totalPage;
              $scope.currentPage = 1;

              if ($scope.selectValue) {
                var selectValue = angular.copy($scope.selectValue);
                var selectValue2 = angular.copy($scope.selectValue2);
                var selectValue3 = angular.copy($scope.selectValue3);

                angular.forEach($scope.listValue, function (val) {
                  if (val) {
                    val.varFilter = (selectValue ? val[selectValue] : '') + (selectValue2 ? ' ' + val[selectValue2] : '') + (selectValue3 ? ' ' + val[selectValue3] : '');
                  }
                });
              }

              if (!$scope.noLoading) {
                $scope.loading = false;
              }
              $scope.holder = $scope.placeholder;
            });
            return $scope.data;
          };

          $scope.scroll = function (query) {
            $scope.currentPage += 1;
            if ($scope.currentPage <= $scope.totalPage) {
              service[serviceFunction]($scope.currentPage, query, $scope.inputData)
                .then(function (response) {
                  $scope.listValue = $scope.responseArray ? $scope.listValue.concat(response[$scope.responseArray]) : $scope.listValue.concat(response);

                  if ($scope.selectValue) {
                    var selectValue = angular.copy($scope.selectValue);
                    var selectValue2 = angular.copy($scope.selectValue2);
                    var selectValue3 = angular.copy($scope.selectValue3);

                    angular.forEach($scope.listValue, function (val) {
                      if (val) {
                        val.varFilter = (selectValue ? val[selectValue] : '') + (selectValue2 ? ' ' + val[selectValue2] : '') + (selectValue3 ? ' ' + val[selectValue3] : '');
                      }
                    });
                  }
                });
            } else {
              $scope.isLastPage = true;
            }
          };

          $scope.click = function () {
            if ($scope.onClick) $scope.onClick();
            else if ($scope.loadOnClick) $scope.load('');
          };
        }]
      };
    }])
    .directive('uiSelectInfinite2', function ($resource, $compile, $injector) {
      return {
        restrict: 'EA',
        require: 'ngModel',
        transclude: true,
        template: '<div style="position:relative;" ui-select2="select2Options" ng-model="ngModel" ng-required="required" ng-disabled="disabled"></div>',
        scope: {
          factory: '@',
          idSelected: '@',
          ngModel: '=',
          multiple: '@?',
          required: '=?',
          disabled: '=?',
          onChange: '&?',
          extraData: '=?'
        },
        compile: function compile() {
          return {
            pre: function preLink(scope, iElement, iAttrs, ngModel) {
              var split = scope.factory.split('.');
              var factory = $injector.get(split[0]);
              var factoryFunction = split[1];
              var multiple = false;

              if (scope.multiple && scope.$eval(iAttrs['multiple']) == true) multiple = true;

              var queryHandler = function (query) {
                if (!angular.isDefined(query.page)) {
                  query.page = 1;
                }
                factory[factoryFunction](query.page, query.term, scope.extraData)
                  .then(function (response) {
                    var more = false;
                    if ((query.page < response.totalPage)) {
                      more = true;
                    }
                    query.callback({
                      results: response.data,
                      more: more
                    });
                  },
                  function () {
                    query.callback({
                      results: [],
                      more: false
                    });
                  });
              };

              var formatSelection = function (response) {
                return response[scope.idSelected];
              };

              var formatResult = function (response) {
                return '<table>' +
                  '<tr><td><div>' + response[scope.idSelected] + '</div></td></tr>' +
                  '</table>';
              };

              scope.$watch(function () { return ngModel.$modelValue }, function (newValue, oldValue) {
                if (scope.onChange) scope.onChange();
              }, true);

              scope.select2Options = {
                multiple: multiple,
                formatResult: formatResult,
                formatSelection: formatSelection,
                query: queryHandler,
                dropdownParent: iElement,
                theme: "bootstrap"
              };
            }
          };
        }
      };
    });
})();