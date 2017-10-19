import {mockData} from './_data.mock';

describe('timetable service', () => {
  let Timetable;

  beforeEach(angular.mock.module('timetable'));
  beforeEach(inject(() => {
    Timetable = angular.injector(['timetable']).get('Timetable');
  }));

  describe('class creation', () => {
    it('should create class object with correct fields', () => {
      let timetable = new Timetable(mockData.data[0]);
      expect(timetable.start).toBeDefined();
      expect(timetable.start.length).toEqual(2);
      expect(timetable.weekAvailability.length).toEqual(7);
    });
  });

  describe('validation', () => {
    it('should correctly validate week-days', () => {
      const timetable = new Timetable(mockData.data[0]);
      expect(timetable.validate(mockData.timeRanges[0])).toBeTruthy();
      expect(timetable.validate(mockData.timeRanges[1])).toBeFalsy();
    });

    it('should correctly validate hours', () => {
      const timetable = new Timetable(mockData.data[0]);
      expect(timetable.validate(mockData.timeRanges[2])).toBeTruthy();
      expect(timetable.validate(mockData.timeRanges[3])).toBeFalsy();
    });
  });
});
