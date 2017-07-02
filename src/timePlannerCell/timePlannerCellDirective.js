import template from './timePlannerCellTemplate.html';

angular
  .module('timePlannerCellDirective', [])
  .directive('timePlannerCell', () => {
    let link = (scope) => {
      scope.onHoverEvent = onHoverEvent;

      function onHoverEvent(item) {
        scope.$parent.highlightedItem = item;
      }
    };

    return {
      restrict: 'A',
      template: template,
      link: link
    };
  });
