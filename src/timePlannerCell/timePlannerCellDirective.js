import template from './timePlannerCellTemplate.html';

angular
  .module('timePlannerCellDirective', [])
  .directive('timePlannerCell', () => {
    let link = (scope) => {

    };

    return {
      restrict: 'A',
      template: template,
      link: link
    };
  });
