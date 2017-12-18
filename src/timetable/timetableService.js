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
          let condition;

          if (this.type === 'night-shift') {
            // Night shift is a special kind of shift.
            // If previous day was not available, we shouldn't use morning hours.
            // If next day is not available, we shouldn't use evening hours.
            let
              morningCondition = endHour < this.end[0],
              eveningCondition = startHour >= this.start[0],
              qualifyingDays;

            switch (weekDay) {
              case 0:
                qualifyingDays = [6, weekDay];
                eveningCondition = this.weekAvailability[qualifyingDays[1]] && eveningCondition;
                morningCondition =
                  startDate.setHours(0,0,0,0) > this.boundaries.from && this.weekAvailability[qualifyingDays[0]];
                break;
              case 6:
                qualifyingDays = [5, weekDay];
                morningCondition = this.weekAvailability[qualifyingDays[0]] && morningCondition;
                eveningCondition =
                  endDate.setHours(23,59,59,999) < this.boundaries.to && this.weekAvailability[qualifyingDays[1]];
                break;
              default:
                qualifyingDays = [weekDay - 1, weekDay];
                morningCondition = this.weekAvailability[qualifyingDays[0]] && morningCondition;
                eveningCondition = this.weekAvailability[qualifyingDays[1]] && eveningCondition;
            }

            condition = morningCondition || eveningCondition;
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
