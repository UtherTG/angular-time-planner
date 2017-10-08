import template from './timePlannerCellTemplate.html';

angular
  .module('timePlannerCellDirective', [])
  .directive('timePlannerCell', ['$rootScope', ($rootScope) => {
    let link = (scope) => {
      // Scope functions
      scope.onHoverEvent = (item) => { scope.$parent.highlightedItem = item };
      scope.onClickEvent = (item) => $rootScope.$broadcast('ATP_SEGMENT_ON_CLICK', item);

    };

    return {
      restrict: 'A',
      template: template,
      link: link
    };
  }]);
