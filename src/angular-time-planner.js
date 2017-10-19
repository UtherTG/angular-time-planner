'use strict';

import './timePlannerContainer/timePlannerContainerDirective';
import './timePlannerRow/timePlannerRowDirective';
import './timePlannerCell/timePlannerCellDirective';
import './timeSegment/timeSegmentService';
import './timetable/timetableService';
import './currentTimeMarker/currentTimeMarkerDirective';

import '../styles/angular-time-planner.scss';

angular
  .module('angularTimePlanner', ['timePlannerContainerDirective', 'timePlannerRowDirective', 'timePlannerCellDirective'])
  .constant('LOCALES', {
    DEFAULT: 'en-us',
    AVAILABLE: ['en-us']
  });
