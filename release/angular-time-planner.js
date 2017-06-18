!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("angular-time-planner", [], factory) : "object" == typeof exports ? exports["angular-time-planner"] = factory() : root["angular-time-planner"] = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.i = function(value) {
            return value;
        }, __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 5);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = {
            labels: {
                rowTitle: "Tasks",
                counterTitle: {
                    days: "Days",
                    hours: "Hours"
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _timePlannerCellTemplate = __webpack_require__(7), _timePlannerCellTemplate2 = function(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }(_timePlannerCellTemplate);
        angular.module("timePlannerCellDirective", []).directive("timePlannerCell", function() {
            var link = function(scope) {};
            return {
                restrict: "A",
                template: _timePlannerCellTemplate2.default,
                link: link
            };
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        var _timePlannerContainerTemplate = __webpack_require__(8), _timePlannerContainerTemplate2 = _interopRequireDefault(_timePlannerContainerTemplate), _deepmerge = __webpack_require__(6), _deepmerge2 = _interopRequireDefault(_deepmerge);
        angular.module("timePlannerContainerDirective", []).directive("timePlannerContainer", [ "$locale", "LOCALES", function($locale, LOCALES) {
            return {
                restrict: "E",
                scope: {
                    options: "=",
                    rows: "="
                },
                link: function(scope) {
                    function _getWeekDays() {
                        var week = [].concat(_toConsumableArray($locale.DATETIME_FORMATS.SHORTDAY));
                        return [].concat(_toConsumableArray(week.splice(scope.options.firstDay || 0, week.length)), _toConsumableArray(week));
                    }
                    var localeId = LOCALES.AVAILABLE.includes($locale.id) ? $locale.id : LOCALES.DEFAULT;
                    scope.locale = (0, _deepmerge2.default)(__webpack_require__(10)("./time-planner-locale_" + localeId), scope.options.locale), 
                    scope.segments = function() {
                        switch (scope.options.timeRangeType) {
                          case "day":
                          case "range":
                            break;

                          case "week":
                          default:
                            return _getWeekDays();
                        }
                    }();
                },
                template: _timePlannerContainerTemplate2.default
            };
        } ]);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _timePlannerRowTemplate = __webpack_require__(9), _timePlannerRowTemplate2 = function(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }(_timePlannerRowTemplate);
        angular.module("timePlannerRowDirective", []).directive("timePlannerRow", function() {
            var link = function(scope) {
                function _fillSegments(item) {
                    var scheduledStart = new Date(item.scheduled_start), scheduledEnd = new Date(item.scheduled_end), itemLength = void 0, firstDayNumber = void 0;
                    scheduledStart.setHours(0, 0, 0, 0), scheduledEnd.setHours(23, 59, 59, 999), scheduledStart = scheduledStart < scope.$parent.options.from ? scope.$parent.options.from : scheduledStart, 
                    scheduledEnd = scheduledEnd > scope.$parent.options.to ? scope.$parent.options.to : scheduledEnd, 
                    firstDayNumber = scheduledStart.getDay(), itemLength = Math.ceil(Math.abs((scheduledStart.getTime() - scheduledEnd.getTime()) / 864e5)), 
                    scope.row.hours += 8 * itemLength;
                    for (var i = 0; i < itemLength; i++) scope.row.segments[firstDayNumber + i].push(item);
                }
                !function() {
                    scope.row.segments = [], scope.row.hours = 0, scope.$parent.segments.forEach(function() {
                        return scope.row.segments.push([]);
                    }), scope.row.items.forEach(_fillSegments);
                }();
            };
            return {
                restrict: "A",
                template: _timePlannerRowTemplate2.default,
                link: link
            };
        });
    }, function(module, exports) {}, function(module, exports, __webpack_require__) {
        "use strict";
        __webpack_require__(2), __webpack_require__(3), __webpack_require__(1), __webpack_require__(4), 
        angular.module("angularTimePlanner", [ "timePlannerContainerDirective", "timePlannerRowDirective", "timePlannerCellDirective" ]).constant("LOCALES", function() {
            return {
                DEFAULT: "en-us",
                AVAILABLE: [ "en-us" ]
            };
        }());
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function isNonNullObject(value) {
            return !!value && "object" == typeof value;
        }
        function isNotSpecial(value) {
            var stringValue = Object.prototype.toString.call(value);
            return "[object RegExp]" !== stringValue && "[object Date]" !== stringValue;
        }
        function emptyTarget(val) {
            return Array.isArray(val) ? [] : {};
        }
        function cloneIfNecessary(value, optionsArgument) {
            return optionsArgument && !0 === optionsArgument.clone && index$2(value) ? deepmerge(emptyTarget(value), value, optionsArgument) : value;
        }
        function defaultArrayMerge(target, source, optionsArgument) {
            var destination = target.slice();
            return source.forEach(function(e, i) {
                void 0 === destination[i] ? destination[i] = cloneIfNecessary(e, optionsArgument) : index$2(e) ? destination[i] = deepmerge(target[i], e, optionsArgument) : -1 === target.indexOf(e) && destination.push(cloneIfNecessary(e, optionsArgument));
            }), destination;
        }
        function mergeObject(target, source, optionsArgument) {
            var destination = {};
            return index$2(target) && Object.keys(target).forEach(function(key) {
                destination[key] = cloneIfNecessary(target[key], optionsArgument);
            }), Object.keys(source).forEach(function(key) {
                index$2(source[key]) && target[key] ? destination[key] = deepmerge(target[key], source[key], optionsArgument) : destination[key] = cloneIfNecessary(source[key], optionsArgument);
            }), destination;
        }
        function deepmerge(target, source, optionsArgument) {
            var array = Array.isArray(source), options = optionsArgument || {
                arrayMerge: defaultArrayMerge
            }, arrayMerge = options.arrayMerge || defaultArrayMerge;
            return array ? Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument) : mergeObject(target, source, optionsArgument);
        }
        var index$2 = function(value) {
            return isNonNullObject(value) && isNotSpecial(value);
        };
        deepmerge.all = function(array, optionsArgument) {
            if (!Array.isArray(array) || array.length < 2) throw new Error("first argument should be an array with at least two elements");
            return array.reduce(function(prev, next) {
                return deepmerge(prev, next, optionsArgument);
            });
        };
        var index = deepmerge;
        module.exports = index;
    }, function(module, exports) {
        module.exports = '<div class=atp-segment-item-wrapper><div class=atp-segment-item ng-repeat="item in segment" ng-class=[item.segmentType]></div></div>';
    }, function(module, exports) {
        module.exports = '<div class=atp-container><div class=atp-head><div class=atp-row><div class="atp-cell atpr-title">{{locale.labels.rowTitle}}</div><div class="atp-cell atpr-counter" ng-if=options.needCounter>{{locale.labels.counterTitle.hours}}</div><div class="atp-cell week-day atp-segment" ng-repeat="segment in segments">{{segment}}</div></div></div><div class=atp-row time-planner-row ng-repeat="row in rows"></div></div>';
    }, function(module, exports) {
        module.exports = '<div class="atp-cell atpr-title">{{row.title}}</div><div class="atp-cell atpr-counter" ng-if=options.needCounter>{{row.hours || 0}}</div><div class="atp-cell week-day atp-segment" ng-repeat="segment in row.segments" time-planner-cell></div>';
    }, function(module, exports, __webpack_require__) {
        function webpackContext(req) {
            return __webpack_require__(webpackContextResolve(req));
        }
        function webpackContextResolve(req) {
            var id = map[req];
            if (!(id + 1)) throw new Error("Cannot find module '" + req + "'.");
            return id;
        }
        var map = {
            "./time-planner-locale_en-us": 0,
            "./time-planner-locale_en-us.js": 0
        };
        webpackContext.keys = function() {
            return Object.keys(map);
        }, webpackContext.resolve = webpackContextResolve, module.exports = webpackContext, 
        webpackContext.id = 10;
    } ]);
});