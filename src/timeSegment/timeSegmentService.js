angular
  .module('timeSegment', [])
  .factory('TimeSegment', [() => {
    class TimeSegment {
      constructor(params) {
        this.name = params.name;
        this.segmentType = params.segmentType;
        this.items = params.items || [];
        this.range = params.range || [];
        this.disabled = params.disabled || false;
      }

      addItem(item) {
        this.items = [...this.items, item];
      }

      removeItem(itemForRemove) {
        this.items = this.items.filter(item => item.id !== itemForRemove.id)
      }

      toggleDisabled(boolean) {
        this.disabled = typeof boolean === 'undefined' ? !this.disabled : boolean;
      }
    }

    return TimeSegment;
  }]);
