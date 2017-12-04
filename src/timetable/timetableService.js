angular
  .module('timetable', [])
  .factory('Timetable', [() => {
    class Timetable {
      constructor(params) {
        this.start = [Number(params.start[0]), Number(params.start[1])];
        this.end = [Number(params.end[0]), Number(params.end[1])];
        this.breakStart = params.breakStart;
        this.breakEnd = params.breakEnd;
        this.name = params.name || 'N/A';
        this.type = params.type;
        this.boundaries = params.boundaries;
        this.weekAvailability = params.weekAvailability;
      }

      validate(range) {
        const
          startDate = new Date(range[0]),
          endDate = new Date(range[1]),
          weekDay = startDate.getDay(),
          startHour = startDate.getHours(),
          endHour = endDate.getHours(),
          overlap = this.start[0] > this.end[0];

        if (startHour === endHour) {
          // if it's an hour, we need to validate hours and day
          return this.weekAvailability[weekDay] &&
            (overlap ?
              (startHour >= this.start[0] && endHour < 24 || startHour >= 0 && endHour < this.end[0]) :
              (startHour >= this.start[0] && endHour < this.end[0]));
        } else {
          // if it's a day, we need to validate only day
          return this.weekAvailability[weekDay];
        }
      }
    }

    return Timetable;
  }]);
