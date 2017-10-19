export const mockData = {
  data: [
    {
      name: 'Mon',
      segmentType: 'week-day',
      disableTimetable: true
    },
    {
      name: 1,
      segmentType: 'hour',
      timetable: {
        start: [1,2],
        end: [1,2],
        weekAvailability: {
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          sat: false,
          sun: false
        }
      },
      items: [
        {id: 1, name: 'item-1'},
        {id: 2, name: 'item-2'}
      ]
    }
  ]
};
