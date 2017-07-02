import template from './timePlannerCellTemplate.html';

angular
  .module('timePlannerCellDirective', [])
  .directive('timePlannerCell', ['$rootScope', ($rootScope) => {
    let link = (scope) => {
      scope.onHoverEvent = onHoverEvent;
      scope.onClickEvent = dispatchClickEvent;

      function onHoverEvent(item) {
        scope.$parent.highlightedItem = item;
      }

      function dispatchClickEvent(item) {
        $rootScope.$broadcast('ATP_SEGMENT_ON_CLICK', item);
      }
    };

    return {
      restrict: 'A',
      template: template,
      link: link
    };
  }]);
