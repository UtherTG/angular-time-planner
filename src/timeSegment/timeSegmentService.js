angular
  .module('timeSegment', [])
  .factory('TimeSegment', [() => {
    class TimeSegment {
      constructor(params) {
        this.name = params.name;
        this.segmentType = params.segmentType;
        this.items = params.items || [];
        this.range = params.range || [];
      }

      addItem(item) {
        this.items = [...this.items, item];
      }

      removeItem(itemForRemove) {
        this.items = this.items.filter(item => item.id !== itemForRemove.id)
      }
    }

    return TimeSegment;
  }]);
