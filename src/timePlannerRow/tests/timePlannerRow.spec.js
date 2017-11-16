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
      expect(angular.element(element[0].querySelectorAll('.atpr-counter'))[0]).toBeDefined();
    });

    it('should create row with timetable column', () => {
      expect(angular.element(element[0].querySelectorAll('.atpr-timetable'))[0]).toBeDefined();
    })
  });

  describe('filling segments for a day', () => {
    it('should create segments key in each row, with the same amount of segments as in $scope.segments', () => {
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.rows[0].segments.length).toEqual(isolatedScope.segments.length);
    });

    it('should count correct amount of hours', () => {
      const isolatedScope = element.isolateScope();
      let expectedResult = 0;
      isolatedScope.rows[0].segments.forEach(segment => expectedResult += segment.items.length);
      expect(isolatedScope.rows[0].hours).toEqual(expectedResult);
    });

    it('should fill correct amount of segments', () => {
      const isolatedScope = element.isolateScope();
      const filledSegmentsCount = [0,0,0,0];

      isolatedScope.rows[0].segments.forEach(segment => {
        segment.items.forEach(item => filledSegmentsCount[item.id]++);
      });

      expect(filledSegmentsCount[0]).toEqual(5);
      expect(filledSegmentsCount[1]).toEqual(9);
      expect(filledSegmentsCount[2]).toEqual(3);
      expect(filledSegmentsCount[3]).toEqual(1);
    });

    it('should calculate correct time range for items', () => {
      const isolatedScope = element.isolateScope();
      const expectedResults = [
        [14, 15, 16, 17, 18],
        [10, 11, 12, 13, 14, 15, 16, 17, 18],
        [10, 11, 12],
        [18],
      ];

      expectedResults.forEach((set, index) => {
        set.forEach(id => {
          expect(isolatedScope.rows[0].segments[id].items.find(item => item.id === index)).toBeDefined();
        });
      });
    });
  });

  describe('filling segments for a week', () => {
    beforeEach(() => {
      $scope.options.timeScope = 'week';
      $scope.options.from = new Date('Sun Oct 01 2017 00:00:00');
      $scope.options.to = new Date('Sat Oct 07 2017 23:59:59.999');
      $scope.$digest();
    });

    it('should create segments key in each row, with the same amount of segments as in $scope.segments', () => {
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.rows[0].segments.length).toEqual(isolatedScope.segments.length);
    });

    it('should count correct amount of hours', () => {
      const isolatedScope = element.isolateScope();
      let expectedResult = 0;
      isolatedScope.rows[1].segments.forEach(segment => expectedResult += segment.items.length * 8);
      expect(isolatedScope.rows[1].hours).toEqual(expectedResult);
    });

    it('should fill correct amount of segments', () => {
      const isolatedScope = element.isolateScope();
      const filledSegmentsCount = [0,0,0,0];

      isolatedScope.rows[1].segments.forEach(segment => {
        segment.items.forEach(item => filledSegmentsCount[item.id]++);
      });

      expect(filledSegmentsCount[0]).toEqual(4);
      expect(filledSegmentsCount[1]).toEqual(1);
      expect(filledSegmentsCount[2]).toEqual(3);
      expect(filledSegmentsCount[3]).toEqual(4);
    });

    it('should calculate correct time range for items', () => {
      const isolatedScope = element.isolateScope();
      const expectedResults = [
        [0, 1, 3, 4],
        [4],
        [0, 1, 3],
        [0, 1, 3, 4],
      ];

      expectedResults.forEach((set, index) => {
        set.forEach(id => {
          expect(isolatedScope.rows[1].segments[id].items.find(item => item.id === index)).toBeDefined();
        });
      });
    });
  });

  describe('filling segments for a month', () => {
    beforeEach(() => {
      $scope.options.timeScope = 'month';
      $scope.options.from = new Date('Sun Oct 01 2017 00:00:00');
      $scope.options.to = new Date('Tue Oct 31 2017 23:59:59.999');
      $scope.$digest();
    });

    it('should create segments key in each row, with the same amount of segments as in $scope.segments', () => {
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.rows[2].segments.length).toEqual(isolatedScope.segments.length);
    });

    it('should count correct amount of hours', () => {
      const isolatedScope = element.isolateScope();
      let expectedResult = 0;
      isolatedScope.rows[2].segments.forEach(segment => expectedResult += segment.items.length * 8);
      expect(isolatedScope.rows[2].hours).toEqual(expectedResult);
    });

    it('should fill correct amount of segments', () => {
      const isolatedScope = element.isolateScope();
      const filledSegmentsCount = [0,0,0,0];

      isolatedScope.rows[2].segments.forEach(segment => {
        segment.items.forEach(item => filledSegmentsCount[item.id]++);
      });

      expect(filledSegmentsCount[0]).toEqual(15);
      expect(filledSegmentsCount[1]).toEqual(2);
      expect(filledSegmentsCount[2]).toEqual(31);
      expect(filledSegmentsCount[3]).toEqual(20);
    });

    it('should calculate correct time range for items', () => {
      const isolatedScope = element.isolateScope();
      const expectedResults = [
        new Array(15).fill(5).map((e, i) => e + i),
        new Array(2).fill(29).map((e, i) => e + i),
        new Array(31).fill(0).map((e, i) => e + i),
        new Array(20).fill(0).map((e, i) => e + i),
      ];

      expectedResults.forEach((set, index) => {
        set.forEach(id => {
          expect(isolatedScope.rows[2].segments[id].items.find(item => item.id === index)).toBeDefined();
        });
      });
    });
  });
});
