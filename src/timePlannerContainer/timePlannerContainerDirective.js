import template from './timePlannerContainerTemplate.html';
import merge from 'deepmerge';
import 'angular-native-dragdrop';


angular
  .module('timePlannerContainerDirective', ['ang-drag-drop'])
  .directive('timePlannerContainer', ['$rootScope', '$locale', 'LOCALES', ($rootScope, $locale, LOCALES) => {
    const controller = ($scope) => {
      let
        _localeId = LOCALES.AVAILABLE.includes($locale.id) ? $locale.id : LOCALES.DEFAULT,
        _defaultOptions = {
          timeScope: 'week',
          needCounter: false,
          editable: false,
          dropChannel: 'atp-row'
        };

      _init();
      $scope.$watchCollection('options', _init);

      // Scope functions
      $scope.onDropEvent = (item, rowId) => $rootScope.$broadcast('ATP_ITEM_ON_DROP', {id: rowId, item: item});

      function _init() {
        // I use private variables since we're not changing options from inside and it's easier to watch and merge scope

        // merge defaults with user options
        $scope.options = merge(_defaultOptions, $scope.options);
        // we use an object with merged default locale and scope override(if any)
        $scope.locale = merge(
          require(`../timePlannerLocales/time-planner-locale_${_localeId}`),
          $scope.options.locale || {}
        );
        // fill segments for current options
        $scope.segments = _getSegments();
      }

      // Get segments for planner, hours, week, dates range. Default is a week.
      function _getSegments() {
        switch ($scope.options.timeScope) {
          case 'day':
            return _getHours();
            break;
          case 'range':
            // reserved for future use
            break;
          case 'week':
          default:
            return _getWeekDays();
        }
      }

      // Method to generate hours labels
      function _getHours() {
        const hours = [];

        for (let i = 0; i < 24; i++) {
          hours.push(i);
        }

        return hours;
      }

      // Method to generate week days labels
      // I use only days from locales. First day of the week is the same as Date() (0 - Sun)
      function _getWeekDays() {
        let
          week = [...$locale.DATETIME_FORMATS.SHORTDAY],
          alteredWeek = week.splice($scope.options.firstDay  || 0, week.length);
        return [...alteredWeek, ...week];
      }

    };

    return {
      restrict: 'E',
      scope: {
        options: '=',
        rows: '='
      },
      controller: controller,
      template: template
    };
  }]);
