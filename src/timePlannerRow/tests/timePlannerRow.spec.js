import '../../angular-time-planner';
import {mockData} from './_data.mock';

describe('timePlannerRow directive', () => {
  let $scope, $compile, element;

  beforeEach(angular.mock.module('angularTimePlanner'));
  beforeEach(() => {
    inject(($rootScope, _$compile_) => {
      const html = '<time-planner-container rows="rows" options="options"><div class="atp-row" ng-repeat="row in rows" time-planner-row></div></time-planner-container>';

      $compile = _$compile_;
      $scope = $rootScope.$new();

      $scope.rows = mockData.rows;
      $scope.options = mockData.options;

      element = $compile(html)($scope);
      $scope.$digest();
    });
  });

  describe('creating row', () => {
    it('should create row with hours counter', () => {
      expect(angular.element(element[0].querySelectorAll('.atpc-label'))[0]).not.toBeUndefined();
    });
  });

  describe('filling segments for a day', () => {
    it('should create segments key in each row, with the same amount of segments as in $scope.segments', () => {
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.rows[0].segments.length).toEqual(isolatedScope.segments.length);
    });

    it('should count 31 hours for \'User 1\'', () => {
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.rows[0].hours).toEqual(31);
    });

    it('should place item with id = \'1\' to every segment from 14 to 20 and not in any other', () => {
      const
        isolatedScope = element.isolateScope(),
        segments = new Array(7).fill(14).map((e, i) => e + i);

      isolatedScope.rows[0].segments.forEach((segment, index) => {
        expect(
          segments.includes(index) && segment.find(item => item.id === 1)
        ).toBeDefined();

        expect(
          !segments.includes(index) && segment.find(item => item.id === 1)
        ).toBeFalsy();
      });
    })
  });

  describe('filling segments for a week', () => {
    beforeEach(() => {
      $scope.options.timeScope = 'week';
      $scope.$digest();
    });

    it('should create segments key in each row, with the same amount of segments as in $scope.segments', () => {
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.rows[0].segments.length).toEqual(isolatedScope.segments.length);
    });
  });
});
