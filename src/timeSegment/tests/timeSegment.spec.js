import {mockData} from './_mock.data';

describe('timeSegment service', () => {
  let TimeSegment;

  beforeEach(angular.mock.module('timeSegment'));
  beforeEach(inject(() => {
    TimeSegment = angular.injector(['timeSegment']).get('TimeSegment');
  }));

  describe('class creation', () => {
    it('should create class object with correct fields', () => {
      let segment = new TimeSegment(mockData.data[0]);
      expect(segment.name).toEqual('Mon');
      expect(segment.segmentType).toEqual('week-day');
    })
  });

  describe('class methods', () => {
    let segment;
    beforeAll(() => segment = new TimeSegment(mockData.data[1]));

    it('should correctly add item to class items', () => {
      segment.addItem({id: 3, name: 'item-3'});
      expect(segment.items.length).toEqual(3);
    });

    it('should correctly remove item from class items', () => {
      segment.removeItem({id: 2});
      expect(segment.items.length).toEqual(2);
      expect(segment.items.find(item => item.id === 2)).toBeUndefined();
    });
  });
});
