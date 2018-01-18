import template from './timePlannerContainerTemplate.html';
import merge from 'deepmerge';
import 'angular-native-dragdrop';


angular
  .module('timePlannerContainerDirective', ['ang-drag-drop', 'timeSegment', 'currentTimeMarkerDirective'])
  .directive('timePlannerContainer', ['$rootScope', '$locale', 'LOCALES', ($rootScope, $locale, LOCALES) => {
    const controller = ['$scope', 'TimeSegment', ($scope, TimeSegment) => {
      let
        _localeId = LOCALES.AVAILABLE.includes($locale.id) ? $locale.id : LOCALES.DEFAULT,
        _defaultOptions = {
          timeScope: 'week',
          editable: false,
          dropChannel: 'atp-row'
        };

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

        $scope.timeMarkerEnabled = _checkIfTimeMarkerIsNeeded();
      }

      function _checkIfTimeMarkerIsNeeded() {
        const today = new Date().getTime();
        if (!$scope.options.from) return false;
        return $scope.options.from.getTime() < today && $scope.options.to.getTime() > today;
      }

      // Get segments for planner, hours, week, dates range. Default is a week.
      function _getSegments() {
        switch ($scope.options.timeScope) {
          case 'day':
            return _getHours();
          case 'range':
            return _getDaysForRange();
          case 'month':
            return _getDaysForMonth();
          case 'week':
          default:
            return _getWeekDays();
        }
      }

      // Method to generate hours labels
      function _getHours() {
        const segments = [];

        for (let i = 0; i < 24; i++) {
          segments.push(new TimeSegment({
            name: i,
            segmentType: 'hour',
            disableTimetable: true
          }));
        }

        return segments;
      }

      function _getDaysForMonth() {
        const
          segments = [],
          fromDate = new Date($scope.options.from),
          month = fromDate.getMonth() + 1,
          daysInMonth = new Date(fromDate.getFullYear(), month, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
          segments.push(new TimeSegment({
            name: `${month}/${i < 10 ? '0' + i : i}`,
            segmentType: 'month-day',
            disableTimetable: true
          }))
        }

        return segments;
      }

      function _getDaysForRange() {
        const
          segments = [],
          fromDate = new Date($scope.options.from),
          toDate = new Date($scope.options.to),
          daysInRange = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000*60*60*24));

        for (let i = 1; i <= daysInRange; i++) {
          let date = new Date(fromDate);
          date.setDate(date.getDate() + (i - 1));
          segments.push(new TimeSegment({
            name: `${date.getMonth() + 1}/${date.getDate()}`,
            segmentType: 'range-day',
            disableTimetable: true
          }))
        }

        return segments;
      }

      // Method to generate week days labels
      // I use only days from locales. First day of the week is the same as Date() (0 - Sun)
      function _getWeekDays() {
        const
          defaultWeek = [...$locale.DATETIME_FORMATS.SHORTDAY],
          alteredWeek = defaultWeek.splice($scope.options.firstDay  || 0, defaultWeek.length),
          preparedWeek = [...alteredWeek, ...defaultWeek],
          segments = [];

        preparedWeek.forEach(day => {
          segments.push(new TimeSegment({
            name: day,
            segmentType: 'week-day',
            disableTimetable: true
          }));
        });

        return segments;
      }

    }];

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
