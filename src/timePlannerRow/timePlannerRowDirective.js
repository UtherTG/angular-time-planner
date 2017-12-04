import template from './timePlannerRowTemplate.html';

angular
  .module('timePlannerRowDirective', ['timeSegment', 'timetable'])
  .directive('timePlannerRow', () => {
    const controller = ['$scope', '$rootScope', 'TimeSegment', 'Timetable', ($scope, $rootScope, TimeSegment, Timetable) => {
      const _methods = {
        week: {
          fillSegments: _fillSegmentsForWeek,
          setRange: _setRangeForDay
        },
        day: {
          fillSegments: _fillSegmentsForDay,
          setRange: _setRangeForHour
        },
        month: {
          fillSegments: _fillSegmentsForMonth,
          setRange: _setRangeForDay
        },
        range: {
          fillSegments: _fillSegmentsForRange,
          setRange: _setRangeForDay
        }
      };

      $scope.showCriticalItems = _showCriticalItems;

      // INIT
      $scope.$watchCollection('options', _prepareItems);

      function _showCriticalItems(criticalItems) {
        $rootScope.$broadcast('ATP_SHOW_CRITICAL_ITEMS', criticalItems);
      }

      // Generate segments for each row
      function _prepareItems() {
        $scope.row.segments = [];
        $scope.row.hours = 0;
        $scope.row.disableTimetable =
          $scope.row.disableTimetable ||
          ['month', 'range'].includes($scope.options.timeScope);

        !$scope.row.disableTimetable && _normalizeRowTimetableData();

        $scope.$parent.segments.forEach((segment, index) => {
          const timeSegment = new TimeSegment({
            ...segment,
            range: _methods[$scope.options.timeScope].setRange(index)
          });

          if (!$scope.row.disableTimetable) {
            let activeTimetable = _getTimetableForCurrentRange($scope.row.timetables, timeSegment.range);
            timeSegment.timetable =
              $scope.row.timetables.length > 0 &&
              activeTimetable &&
              new Timetable(activeTimetable);

            timeSegment.toggleDisabled(!activeTimetable || !timeSegment.timetable.validate(timeSegment.range));
          }

          $scope.row.segments.push(timeSegment);
        });

        $scope.row.items.forEach(_methods[$scope.options.timeScope].fillSegments);
      }

      function _normalizeRowTimetableData() {
        $scope.row.timetablesNames = [];
        $scope.row.timetablesClasses = {
          'timetable-type-on-call': false,
          'timetable-type-night-shift': false,
        };
        $scope.row.timetables.forEach(timetable => {
          if (timetable.type !== 'on-call') {
            !$scope.row.timetablesNames.includes(timetable.name) && $scope.row.timetablesNames.push(timetable.name);
            if (timetable.type === 'night-shift') {
              $scope.row.timetablesClasses['timetable-type-night-shift'] = true;
            }
          } else {
            $scope.row.timetablesClasses['timetable-type-on-call'] = true
          }
        });

        if (!$scope.row.timetablesNames.length) {
          $scope.row.timetablesNames.push('N/A');
        }
      }

      function _getTimetableForCurrentRange(timetables, segmentRange) {
        return timetables.find(timetable => {
          return timetable.type !== 'on-call' || // We don't need on-call types here
            (segmentRange[1] > timetable.boundaries.from && timetable.boundaries.to < segmentRange[0]);
        });
      }

      function _setRangeForDay(index) {
        let
          rangeFrom = new Date($scope.options.from),
          rangeTo = new Date($scope.options.to),
          firstDate = rangeFrom.getDate();

        rangeFrom = rangeFrom.setDate(firstDate + index);
        rangeTo = rangeTo.setDate(firstDate + index);
        return [rangeFrom, rangeTo]
      }

      function _setRangeForHour(index) {
        let
          rangeFrom = new Date($scope.$parent.options.from),
          rangeTo = new Date($scope.$parent.options.to);

        rangeFrom = rangeFrom.setHours(index);
        rangeTo = rangeTo.setHours(index);
        return [rangeFrom, rangeTo];
      }

      function _fillSegmentsForRange(item) {
        let
          schedule = {
            scheduledStart: new Date(item.scheduled_start),
            scheduledEnd: new Date(item.scheduled_end),
          },
          msInDay = 24 * 60 * 60 * 1000,
          itemLength, firstDayNumber;

        schedule.scheduledStart.setHours(0,0,0,0);
        schedule.scheduledEnd.setHours(23,59,59,999);

        schedule = _setBoundaries(schedule);
        firstDayNumber =
          ($scope.$parent.options.from.getTime() - schedule.scheduledStart.getTime()) /
          msInDay;

        itemLength = Math.ceil(
          Math.abs((schedule.scheduledStart.getTime() - schedule.scheduledEnd.getTime()) / msInDay)
        );

        for (let i = 0; i < itemLength; i++) {
          if ($scope.row.segments[firstDayNumber + i] && !$scope.row.segments[firstDayNumber + i].disabled) {
            $scope.row.segments[firstDayNumber + i].addItem(item);

            if (!$scope.options.disableCounter) {
              $scope.row.hours += 8;
            }
          }
        }
      }

      function _fillSegmentsForMonth(item) {
        let
          schedule = {
            scheduledStart: new Date(item.scheduled_start),
            scheduledEnd: new Date(item.scheduled_end),
          },
          msInDay = 24 * 60 * 60 * 1000,
          itemLength, firstDayNumber;

        schedule.scheduledStart.setHours(0,0,0,0);
        schedule.scheduledEnd.setHours(23,59,59,999);

        schedule = _setBoundaries(schedule);
        firstDayNumber = schedule.scheduledStart.getDate() - 1;

        itemLength = Math.ceil(
          Math.abs((schedule.scheduledStart.getTime() - schedule.scheduledEnd.getTime()) / msInDay)
        );

        for (let i = 0; i < itemLength; i++) {
          if ($scope.row.segments[firstDayNumber + i] && !$scope.row.segments[firstDayNumber + i].disabled) {
            $scope.row.segments[firstDayNumber + i].addItem(item);

            if (!$scope.options.disableCounter) {
              $scope.row.hours += 8;
            }
          }
        }
      }

      // Fill each segment with items. This method is solely for week time scope
      function _fillSegmentsForWeek(item) {
        let
          schedule = {
            scheduledStart: new Date(item.scheduled_start),
            scheduledEnd: new Date(item.scheduled_end),
          },
          msInDay = 24 * 60 * 60 * 1000,
          itemLength, firstDayNumber;

        schedule.scheduledStart.setHours(0,0,0,0);
        schedule.scheduledEnd.setHours(23,59,59,999);

        schedule = _setBoundaries(schedule);
        firstDayNumber = schedule.scheduledStart.getDay();

        itemLength = Math.ceil(
          Math.abs((schedule.scheduledStart.getTime() - schedule.scheduledEnd.getTime()) / msInDay)
        );

        for (let i = 0; i < itemLength; i++) {
          if ($scope.row.segments[firstDayNumber + i] && !$scope.row.segments[firstDayNumber + i].disabled) {
            $scope.row.segments[firstDayNumber + i].addItem(item);

            if (!$scope.options.disableCounter) {
              $scope.row.hours += 8;
            }
          }
        }
      }

      // Fill each segment with items. This method is solely for day time scope
      function _fillSegmentsForDay(item) {
        let
          schedule = {
            scheduledStart: new Date(item.scheduled_start),
            scheduledEnd: new Date(item.scheduled_end)
          },
          itemLength, firstHour, overlap;

        schedule = _setBoundaries(schedule);
        firstHour = schedule.scheduledStart.getHours();
        overlap = schedule.scheduledStart.getHours() > schedule.scheduledEnd.getHours();
        itemLength = (overlap ? 24 : schedule.scheduledEnd.getHours()) - schedule.scheduledStart.getHours();
        itemLength += schedule.scheduledEnd.getMinutes() === 0 ? 0 : 1; // if it ends with 00 - we don't count that hour

        for (let i = 0; i < itemLength; i++) {
          if ($scope.row.segments[firstHour + i] && !$scope.row.segments[firstHour + i].disabled) {
            $scope.row.segments[firstHour + i].addItem(item);

            if (!$scope.options.disableCounter) {
              $scope.row.hours++;
            }
          }
        }
      }

      // Set boundaries for item inside the planner
      function _setBoundaries(schedule) {
        schedule.scheduledStart = schedule.scheduledStart.getTime() < $scope.$parent.options.from.getTime() ?
          $scope.$parent.options.from : schedule.scheduledStart;

        schedule.scheduledEnd = schedule.scheduledEnd.getTime() > $scope.$parent.options.to.getTime() ?
          $scope.$parent.options.to : schedule.scheduledEnd;

        // If item cannot be placed in boundaries, it should have zero diff between start and end
        if (schedule.scheduledStart.getTime() > schedule.scheduledEnd.getTime()) {
          schedule.scheduledStart = schedule.scheduledEnd;
        }

        return schedule;
      }
    }];

    return {
      restrict: 'A',
      template: template,
      controller: controller
    };
  });
