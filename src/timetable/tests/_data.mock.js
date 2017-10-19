export const mockData = {
  data: [
    {
      start: ['12', '00'],
      end: [19, 0],
      weekAvailability: [true, true, true, true, false, false, true]
    }
  ],
  timeRanges: [
    [new Date('Wed Oct 18 2017 13:00:00').getTime(), new Date('Wed Oct 18 2017 18:00:00').getTime()],
    [new Date('Thu Oct 19 2017 13:00:00').getTime(), new Date('Thu Oct 19 2017 18:00:00').getTime()],
    [new Date('Wed Oct 18 2017 18:00:00').getTime(), new Date('Wed Oct 18 2017 18:59:59.999').getTime()],
    [new Date('Wed Oct 18 2017 19:00:00').getTime(), new Date('Wed Oct 18 2017 19:59:59.999').getTime()]
  ]
};
