(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("angularTimePlanner", [], factory);
	else if(typeof exports === 'object')
		exports["angularTimePlanner"] = factory();
	else
		root["angularTimePlanner"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  labels: {
    rowTitle: 'Tasks',
    counterTitle: {
      days: 'Days',
      hours: 'Hours'
    }
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _timePlannerCellTemplate = __webpack_require__(7);

var _timePlannerCellTemplate2 = _interopRequireDefault(_timePlannerCellTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('timePlannerCellDirective', []).directive('timePlannerCell', function () {
  var link = function link(scope) {
    scope.onHoverEvent = onHoverEvent;

    function onHoverEvent(item) {
      scope.$parent.highlightedItem = item;
    }
  };

  return {
    restrict: 'A',
    template: _timePlannerCellTemplate2.default,
    link: link
  };
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _timePlannerContainerTemplate = __webpack_require__(8);

var _timePlannerContainerTemplate2 = _interopRequireDefault(_timePlannerContainerTemplate);

var _deepmerge = __webpack_require__(6);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

angular.module('timePlannerContainerDirective', []).directive('timePlannerContainer', ['$locale', 'LOCALES', function ($locale, LOCALES) {
  var link = function link(scope) {
    var _localeId = LOCALES.AVAILABLE.includes($locale.id) ? $locale.id : LOCALES.DEFAULT,
        _defaultOptions = {
      timeScope: 'week',
      needCounter: false
    };

    // we use an object with merged default locale and scope override(if any)
    scope.locale = (0, _deepmerge2.default)(__webpack_require__(10)("./time-planner-locale_" + _localeId), scope.options.locale);
    // merge defaults with user options
    scope.options = (0, _deepmerge2.default)(_defaultOptions, scope.options);

    scope.segments = _getSegments();

    // Get segments for planner, hours, week, dates range. Default is a week.
    function _getSegments() {
      switch (scope.options.timeScope) {
        case 'day':
          // reserved for future use
          break;
        case 'range':
          // reserved for future use
          break;
        case 'week':
        default:
          return _getWeekDays();
      }
    }

    // I use only days from locales. First day of the week is the same as Date() (0 - Sun)
    function _getWeekDays() {
      var week = [].concat(_toConsumableArray($locale.DATETIME_FORMATS.SHORTDAY)),
          alteredWeek = week.splice(scope.options.firstDay || 0, week.length);
      return [].concat(_toConsumableArray(alteredWeek), _toConsumableArray(week));
    }
  };

  return {
    restrict: 'E',
    scope: {
      options: '=',
      rows: '='
    },
    link: link,
    template: _timePlannerContainerTemplate2.default
  };
}]);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _timePlannerRowTemplate = __webpack_require__(9);

var _timePlannerRowTemplate2 = _interopRequireDefault(_timePlannerRowTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('timePlannerRowDirective', []).directive('timePlannerRow', function () {
  var link = function link(scope) {
    var _methods = {
      week: {
        fillSegments: _fillSegmentsForWeek
      }
    };

    _prepareItems();

    function _prepareItems() {
      scope.row.segments = [];
      scope.row.hours = 0;
      scope.$parent.segments.forEach(function () {
        return scope.row.segments.push([]);
      });
      scope.row.items.forEach(_methods[scope.$parent.options.timeScope].fillSegments);
    }

    function _fillSegmentsForWeek(item) {
      var scheduledStart = new Date(item.scheduled_start),
          scheduledEnd = new Date(item.scheduled_end),
          msInDay = 24 * 60 * 60 * 1000,
          itemLength = void 0,
          firstDayNumber = void 0;

      scheduledStart.setHours(0, 0, 0, 0);
      scheduledEnd.setHours(23, 59, 59, 999);

      scheduledStart = scheduledStart < scope.$parent.options.from ? scope.$parent.options.from : scheduledStart;
      scheduledEnd = scheduledEnd > scope.$parent.options.to ? scope.$parent.options.to : scheduledEnd;
      firstDayNumber = scheduledStart.getDay();

      itemLength = Math.ceil(Math.abs((scheduledStart.getTime() - scheduledEnd.getTime()) / msInDay));
      scope.row.hours += itemLength * 8;

      for (var i = 0; i < itemLength; i++) {
        scope.row.segments[firstDayNumber + i].push(item);
      }
    }
  };

  return {
    restrict: 'A',
    template: _timePlannerRowTemplate2.default,
    link: link
  };
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(1);

__webpack_require__(4);

angular.module('angularTimePlanner', ['timePlannerContainerDirective', 'timePlannerRowDirective', 'timePlannerCellDirective']).constant('LOCALES', {
  DEFAULT: 'en-us',
  AVAILABLE: ['en-us']
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var index$2 = function isMergeableObject(value) {
	return isNonNullObject(value) && isNotSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isNotSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue !== '[object RegExp]'
		&& stringValue !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && index$2(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (index$2(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (index$2(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!index$2(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var index = deepmerge;

module.exports = index;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<div class=atp-segment-item-wrapper><div class=atp-segment-item ng-repeat=\"item in segment\" ng-class=\"[item.segmentType, {'highlighted': (item.id === highlightedItem.id)}]\" ng-mouseenter=onHoverEvent(item) ng-mouseleave=onHoverEvent() ng-click=\"\"></div></div>";

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<div class=atp-container><div class=atp-head><div class=atp-row><div class=\"atp-cell atpr-title\">{{locale.labels.rowTitle}}</div><div class=\"atp-cell atpr-counter\" ng-if=options.needCounter>{{locale.labels.counterTitle.hours}}</div><div class=\"atp-cell week-day atp-segment\" ng-repeat=\"segment in segments\">{{segment}}</div></div></div><div class=atp-row time-planner-row ng-repeat=\"row in rows\"></div></div>";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div class=\"atp-cell atpr-title\">{{row.title}}</div><div class=\"atp-cell atpr-counter\" ng-if=options.needCounter>{{row.hours || 0}}</div><div class=\"atp-cell week-day atp-segment\" ng-repeat=\"segment in row.segments\" time-planner-cell></div>";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./time-planner-locale_en-us": 0,
	"./time-planner-locale_en-us.js": 0
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;

/***/ })
/******/ ]);
});
//# sourceMappingURL=angular-time-planner.js.map