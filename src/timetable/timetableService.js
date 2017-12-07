angular
  .module('timetable', [])
  .factory('Timetable', [() => {
    class Timetable {
      constructor(params) {
        this.start = [Number(params.start[0]), Number(params.start[1])];
        this.end = [Number(params.end[0]), Number(params.end[1])];
        this.breakStart = params.breakStart && [Number(params.breakStart[0]), Number(params.breakStart[1])];
        this.breakEnd = params.breakEnd && [Number(params.breakEnd[0]), Number(params.breakEnd[1])];
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
          endHour = endDate.getHours();

        if (startHour === endHour) {
          let morningCondition, eveningCondition, condition;

          if (this.type === 'night-shift') {
            // Night shift is a special kind of shift.
            // If previous day was not available, we shouldn't use morning hours.
            // And if current day is not available, but previous was, we should use morning hours.

            // take care of evening hours first
            morningCondition = endHour < this.end[0];
            eveningCondition = startHour >= this.start[0];

            if (weekDay === 0) {
              // if it's a first day of the week, the only way to know if previous day was available(or not)
              // is to check if this week is first in cycle. If yes, previous day was not available
              // if this week not the first in cycle we should use last day of a previous cycle
              if (this.boundaries.from < range[0]) {
                // if not first in cycle check last day in the week
                if (this.weekAvailability[6]) {
                  // last day on previous week was available, so we use morning hours
                  // check current day, and if it is available use evening hours too
                  condition = this.weekAvailability[weekDay] ? (eveningCondition || morningCondition) : morningCondition;
                } else {
                  // last day on previous week was not available, so we check current day
                  // and use only evening hours
                  condition = eveningCondition && this.weekAvailability[weekDay];
                }
              } else {
                // if first in cycle use evening hours if current day is available
                condition = eveningCondition && this.weekAvailability[weekDay];
              }
            } else {
              // check previous day, see if it was available or not
              if (this.weekAvailability[weekDay - 1]) {
                // if yes, use morning hours and check if current day available.
                // if current day is available use evening hours too
                condition = this.weekAvailability[weekDay] ? (eveningCondition || morningCondition) : morningCondition;
              } else {
                // if not, use only evening hours
                condition = eveningCondition && this.weekAvailability[weekDay];
              }
            }
          } else {
            condition = this.weekAvailability[weekDay] && (startHour >= this.start[0] && endHour < this.end[0]);
          }

          return condition;
        } else {
          // if it's a day, we need to validate only day
          return this.weekAvailability[weekDay];
        }
      }
    }

    return Timetable;
  }]);
