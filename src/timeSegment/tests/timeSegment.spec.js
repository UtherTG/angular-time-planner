import {mockData} from './_data.mock';

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
    });
  });

  describe('class methods', () => {
    let segment;
    beforeAll(() => segment = new TimeSegment(mockData.data[1]));

    describe('addItem method', () => {
      it('should correctly add item to class items', () => {
        segment.addItem({id: 3, name: 'item-3'});
        expect(segment.items.length).toEqual(3);
      });
    });

    describe('removeItem method', () => {
      it('should correctly remove item from class items', () => {
        segment.removeItem({id: 2});
        expect(segment.items.length).toEqual(2);
        expect(segment.items.find(item => item.id === 2)).toBeUndefined();
      });
    });

    describe('toggleDisabled method', () => {
      it('should toggle disabled key for segment if nothing passed to method', () => {
        segment.toggleDisabled();
        expect(segment.disabled).toBeTruthy();
        segment.toggleDisabled();
        expect(segment.disabled).toBeFalsy();
      });

      it('should set disable to true/false if boolean passed to method', () => {
        segment.toggleDisabled(false);
        expect(segment.disabled).toBeFalsy();
        segment.toggleDisabled(true);
        expect(segment.disabled).toBeTruthy();
      });
    })
  });
});
