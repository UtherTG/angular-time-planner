import template from './timePlannerRowTemplate.html';

angular
  .module('timePlannerRowDirective', [])
  .directive('timePlannerRow', () => {
    const link = (scope) => {
      const _methods = {
        week: {
          fillSegments: _fillSegmentsForWeek
        },
        day: {
          fillSegments: _fillSegmentsForDay
        }
      };

      // INIT
      _prepareItems();

      // Generate segments for each row
      function _prepareItems() {
        scope.row.segments = [];
        scope.row.hours = 0;
        scope.$parent.segments.forEach(() => scope.row.segments.push([]));
        scope.row.items.forEach(_methods[scope.$parent.options.timeScope].fillSegments);
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

        scope.row.hours += itemLength * 8;

        for (let i = 0; i < itemLength; i++) {
          scope.row.segments[firstDayNumber + i].push(item);
        }
      }

      // Fill each segment with items. This method is solely for day time scope
      function _fillSegmentsForDay(item) {
        let
          schedule = {
            scheduledStart: new Date(item.scheduled_start),
            scheduledEnd: new Date(item.scheduled_end)
          },
          itemLength, firstHour;

        schedule = _setBoundaries(schedule);
        firstHour = schedule.scheduledStart.getHours();
        itemLength = schedule.scheduledEnd.getHours() - schedule.scheduledStart.getHours() + 1;

        scope.row.hours += itemLength;

        for (let i = 0; i < itemLength; i++) {
          scope.row.segments[firstHour + i].push(item);
        }
      }

      // Set boundaries for item inside the planner
      function _setBoundaries(schedule) {
        schedule.scheduledStart = schedule.scheduledStart < scope.$parent.options.from ?
          new Date(scope.$parent.options.from) : schedule.scheduledStart;

        schedule.scheduledEnd = schedule.scheduledEnd > scope.$parent.options.to ?
          new Date(scope.$parent.options.to) : schedule.scheduledEnd;

        return schedule;
      }
    };

    return {
      restrict: 'A',
      template: template,
      link: link
    };
  });
