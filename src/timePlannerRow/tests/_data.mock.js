export const mockData = {
  rows: [
    {
      title: 'User 1',
      editable: true,
      id: 1,
      timetables: [{
        start: [10, 0],
        end: [19, 0],
        weekAvailability: [true, true, true, true, true, true, true],
      }],
      items: [
        {
          id: 0,
          scheduled_start:'Fri Oct 06 2017 14:00:00',
          scheduled_end: 'Fri Oct 06 2017 21:00:00',
        },
        {
          id: 1,
          scheduled_start: 'Thu Oct 05 2017 21:00:00',
          scheduled_end: 'Sat Oct 07 2017 06:00:00',
        },
        {
          id: 2,
          scheduled_start:'Thu Oct 05 2017 14:00:00',
          scheduled_end: 'Fri Oct 06 2017 13:00:00',
        },
        {
          id: 3,
          scheduled_start: 'Fri Oct 06 2017 18:00:00',
          scheduled_end: 'Sat Oct 07 2017 06:00:00',
        },
      ]
    },
    {
      title: 'User 2',
      editable: true,
      id: 2,
      timetables: [{
        start: [15, 0],
        end: [21, 0],
        weekAvailability: [true, true, false, true, true, false, false],
      }],
      items: [
        {
          id: 0,
          scheduled_start: 'Sun Oct 01 2017 14:00:00',
          scheduled_end: 'Thu Oct 19 2017 21:00:00',
        },
        {
          id: 1,
          scheduled_start: 'Thu Oct 05 2017 21:00:00',
          scheduled_end: 'Sat Oct 07 2017 06:00:00',
        },
        {
          id: 2,
          scheduled_start: 'Fri Sep 29 2017 14:00:00',
          scheduled_end: 'Wed Oct 04 2017 21:00:00',
        },
        {
          id: 3,
          scheduled_start: 'Fri Sep 29 2017 21:00:00',
          scheduled_end: 'Thu Oct 19 2017 06:00:00',
        },
      ]
    },
    {
      title: 'User 3',
      editable: true,
      id: 3,
      timetables: [{
        start: [15, 0],
        end: [21, 0],
        weekAvailability: [true, true, true, true, false, false, false],
      }],
      items: [
        {
          id: 0,
          scheduled_start: 'Fri Oct 06 2017 14:00:00',
          scheduled_end: 'Fri Oct 20 2017 21:00:00',
        },
        {
          id: 1,
          scheduled_start: 'Mon Oct 30 2017 06:00:00',
          scheduled_end: 'Wed Nov 15 2017 21:00:00',
        },
        {
          id: 2,
          scheduled_start: 'Mon Sep 25 2017 06:00:00',
          scheduled_end: 'Wed Nov 15 2017 21:00:00',
        },
        {
          id: 3,
          scheduled_start: 'Mon Sep 25 2017 06:00:00',
          scheduled_end: 'Fri Oct 20 2017 21:00:00',
        },
      ]
    }
  ],
  options: {
    type: 'histogram',
    timeScope: 'day',
    from: new Date('Fri Oct 06 2017 00:00:00'),
    to: new Date('Fri Oct 06 2017 23:59:59.999'),
  }
};
