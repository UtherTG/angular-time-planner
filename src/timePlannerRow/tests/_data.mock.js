export const mockData = {
  rows: [
    {
      title: 'User 1',
      editable: true,
      id: 1,
      items: [
        { // hours 7
          id: 1,
          scheduled_start: 1507280400000, // 06.10 14
          scheduled_end: 1507305600000 // 06.10 21
        },
        { // hours 36
          id: 2,
          scheduled_start: 1507219200000, // 05.10 21
          scheduled_end: 1507338000000 // 07.10 06
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
          scheduled_start: 1507280400000, // 06.10 14
          scheduled_end: 1507305600000 // 06.10 21
        },
        { // hours 36
          id: 2,
          scheduled_start: 1507219200000, // 05.10 21
          scheduled_end: 1507338000000 // 07.10 06
        }
      ]
    }
  ],
  options: {
    type: 'histogram',
    needCounter: true,
    timeScope: 'day',
    from: 1507230000000, // 06.10 00
    to: 1507316399999,  // 06.10 23-59
  }
};
