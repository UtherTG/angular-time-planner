import template from './timePlannerRowTemplate.html';

angular
  .module('timePlannerRowDirective', [])
  .directive('timePlannerRow', () => {
    let link = (scope) => {
      _prepareItems();

      // For now it's only for weekly view
      function _prepareItems() {
        scope.row.segments = [];
        scope.row.hours = 0;
        scope.$parent.segments.forEach(() => scope.row.segments.push([]));
        scope.row.items.forEach(_fillSegments);
      }

      function _fillSegments(item) {
        let
          scheduledStart = new Date(item.scheduled_start),
          scheduledEnd = new Date(item.scheduled_end),
          msInDay = 24 * 60 * 60 * 1000,
          itemLength, firstDayNumber;

        scheduledStart.setHours(0,0,0,0);
        scheduledEnd.setHours(23,59,59,999);

        scheduledStart = scheduledStart < scope.$parent.options.from ? scope.$parent.options.from : scheduledStart;
        scheduledEnd = scheduledEnd > scope.$parent.options.to ? scope.$parent.options.to : scheduledEnd;
        firstDayNumber = scheduledStart.getDay();

        itemLength = Math.ceil(Math.abs((scheduledStart.getTime() - scheduledEnd.getTime()) / msInDay));
        scope.row.hours += itemLength * 8;

        for (let i = 0; i < itemLength; i++) {
          scope.row.segments[firstDayNumber + i].push(item);
        }
      }
    };

    return {
      restrict: 'A',
      template: template,
      link: link
    };
  });
