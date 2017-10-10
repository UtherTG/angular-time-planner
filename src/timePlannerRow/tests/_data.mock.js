export const mockData = {
  rows: [
    {
      title: 'User 1',
      editable: true,
      id: 1,
      items: [
        { // hours 7
          id: 1,
          scheduled_start: 'Fri Oct 06 2017 14:00:00 UT',
          scheduled_end: 'Fri Oct 06 2017 21:00:00 UT'
        },
        { // hours 36
          id: 2,
          scheduled_start: 'Thu Oct 05 2017 21:00:00 UT',
          scheduled_end: 'Sat Oct 07 2017 06:00:00 UT'
        }
      ]
    },
    {
      title: 'User 2',
      editable: true,
      hours: 106,
      id: 2,
      items: [
        { // hours 7
          id: 1,
          scheduled_start: 'Fri Oct 06 2017 14:00:00 UT',
          scheduled_end: 'Fri Oct 06 2017 21:00:00 UT'
        },
        { // hours 36
          id: 2,
          scheduled_start: 'Thu Oct 05 2017 21:00:00 UT',
          scheduled_end: 'Sat Oct 07 2017 06:00:00 UT'
        }
      ]
    }
  ],
  options: {
    type: 'histogram',
    needCounter: true,
    timeScope: 'day',
    from: 'Fri Oct 06 2017 00:00:00 UT', // 06.10 00
    to: 'Fri Oct 06 2017 23:59:59.999 UT',  // 06.10 23-59
  }
};
