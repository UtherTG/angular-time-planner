import template from './timePlannerRowTemplate.html';

angular
  .module('timePlannerRowDirective', ['timeSegment', 'timetable'])
  .directive('timePlannerRow', () => {
    const controller = ['$scope', 'TimeSegment', 'Timetable', ($scope, TimeSegment, Timetable) => {
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
        }
      };

      // INIT
      $scope.$watchCollection('options', _prepareItems);

      // Generate segments for each row
      function _prepareItems() {
        $scope.row.segments = [];
        $scope.row.hours = 0;
        $scope.row.disableTimetable = $scope.options.timeScope === 'month';
        $scope.$parent.segments.forEach((segment, index) => {
          const timeSegment = new TimeSegment({
            ...segment,
            range: _methods[$scope.options.timeScope].setRange(index)
          });

          if (!$scope.row.disableTimetable) {
            timeSegment.timetable = $scope.row.timetable && new Timetable($scope.row.timetable);
            timeSegment.toggleDisabled(!timeSegment.timetable || !timeSegment.timetable.validate(timeSegment.range));
          }

          $scope.row.segments.push(timeSegment);
        });
        $scope.row.items.forEach(_methods[$scope.options.timeScope].fillSegments);
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
          if (!$scope.row.segments[firstDayNumber + i].disabled) {
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
          if (!$scope.row.segments[firstDayNumber + i].disabled) {
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
          if (!$scope.row.segments[firstHour + i].disabled) {
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
