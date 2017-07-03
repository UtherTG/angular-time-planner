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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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


var _timePlannerCellTemplate = __webpack_require__(9);

var _timePlannerCellTemplate2 = _interopRequireDefault(_timePlannerCellTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('timePlannerCellDirective', []).directive('timePlannerCell', ['$rootScope', function ($rootScope) {
  var link = function link(scope) {
    // Scope functions
    scope.onHoverEvent = function (item) {
      scope.$parent.highlightedItem = item;
    };
    scope.onClickEvent = function (item) {
      return $rootScope.$broadcast('ATP_SEGMENT_ON_CLICK', item);
    };
  };

  return {
    restrict: 'A',
    template: _timePlannerCellTemplate2.default,
    link: link
  };
}]);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _timePlannerContainerTemplate = __webpack_require__(10);

var _timePlannerContainerTemplate2 = _interopRequireDefault(_timePlannerContainerTemplate);

var _deepmerge = __webpack_require__(8);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

angular.module('timePlannerContainerDirective', ['ang-drag-drop']).directive('timePlannerContainer', ['$rootScope', '$locale', 'LOCALES', function ($rootScope, $locale, LOCALES) {
  var link = function link(scope) {
    var _localeId = LOCALES.AVAILABLE.includes($locale.id) ? $locale.id : LOCALES.DEFAULT,
        _defaultOptions = {
      timeScope: 'week',
      needCounter: false,
      editable: false,
      dropChannel: 'atp-row'
    };

    // Scope functions
    scope.onDropEvent = function (item, rowId) {
      return $rootScope.$broadcast('ATP_ITEM_ON_DROP', { id: rowId, item: item });
    };

    // we use an object with merged default locale and scope override(if any)
    scope.locale = (0, _deepmerge2.default)(__webpack_require__(12)("./time-planner-locale_" + _localeId), scope.options.locale);
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


var _timePlannerRowTemplate = __webpack_require__(11);

var _timePlannerRowTemplate2 = _interopRequireDefault(_timePlannerRowTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('timePlannerRowDirective', []).directive('timePlannerRow', function () {
  var link = function link(scope) {
    var _methods = {
      week: {
        fillSegments: _fillSegmentsForWeek
      }
    };

    // INIT
    _prepareItems();

    // Generate segments for each row
    function _prepareItems() {
      scope.row.segments = [];
      scope.row.hours = 0;
      scope.$parent.segments.forEach(function () {
        return scope.row.segments.push([]);
      });
      scope.row.items.forEach(_methods[scope.$parent.options.timeScope].fillSegments);
    }

    // Fill each segment with items. This method is solely for week time scope
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
/***/ (function(module, exports) {

(function(angular) {
    'use strict';

    function isDnDsSupported() {
        return 'ondrag' in document.createElement('a');
    }

    function determineEffectAllowed(e) {
        if(e.originalEvent) {
          e.dataTransfer = e.originalEvent.dataTransfer;
        }

        // Chrome doesn't set dropEffect, so we have to work it out ourselves
        if (typeof e.dataTransfer !== 'undefined' && e.dataTransfer.dropEffect === 'none') {
            if (e.dataTransfer.effectAllowed === 'copy' ||
                e.dataTransfer.effectAllowed === 'move') {
                e.dataTransfer.dropEffect = e.dataTransfer.effectAllowed;
            } else if (e.dataTransfer.effectAllowed === 'copyMove' || e.dataTransfer.effectAllowed === 'copymove') {
                e.dataTransfer.dropEffect = e.ctrlKey ? 'copy' : 'move';
            }
        }
    }

    if (!isDnDsSupported()) {
        angular.module('ang-drag-drop', []);
        return;
    }

    var module = angular.module('ang-drag-drop', []);

    module.directive('uiDraggable', ['$parse', '$rootScope', '$dragImage', function($parse, $rootScope, $dragImage) {
        return function(scope, element, attrs) {
            var isDragHandleUsed = false,
                dragHandleClass,
                draggingClass = attrs.draggingClass || 'on-dragging',
                dragTarget;

            element.attr('draggable', false);

            scope.$watch(attrs.uiDraggable, function(newValue) {
                if (newValue) {
                    element.attr('draggable', newValue);
                    element.bind('dragend', dragendHandler);
                    element.bind('dragstart', dragstartHandler);
                }
                else {
                    element.removeAttr('draggable');
                    element.unbind('dragend', dragendHandler);
                    element.unbind('dragstart', dragstartHandler);
                }

            });

            if (angular.isString(attrs.dragHandleClass)) {
                isDragHandleUsed = true;
                dragHandleClass = attrs.dragHandleClass.trim() || 'drag-handle';

                element.bind('mousedown', function(e) {
                    dragTarget = e.target;
                });
            }

            function dragendHandler(e) {
                if(e.originalEvent) {
                  e.dataTransfer = e.originalEvent.dataTransfer;
                }

                setTimeout(function() {
                    element.unbind('$destroy', dragendHandler);
                }, 0);
                var sendChannel = attrs.dragChannel || 'defaultchannel';
                $rootScope.$broadcast('ANGULAR_DRAG_END', e, sendChannel);

                determineEffectAllowed(e);

                if (e.dataTransfer && e.dataTransfer.dropEffect !== 'none') {
                    if (attrs.onDropSuccess) {
                        var onDropSuccessFn = $parse(attrs.onDropSuccess);
                        scope.$evalAsync(function() {
                            onDropSuccessFn(scope, {$event: e});
                        });
                    }
                }else if (e.dataTransfer && e.dataTransfer.dropEffect === 'none'){
                    if (attrs.onDropFailure) {
                        var onDropFailureFn = $parse(attrs.onDropFailure);
                        scope.$evalAsync(function() {
                            onDropFailureFn(scope, {$event: e});
                        });
                    }
                }
                element.removeClass(draggingClass);
            }

            function setDragElement(e, dragImageElementId) {
                var dragImageElementFn;

                if(e.originalEvent) {
                  e.dataTransfer = e.originalEvent.dataTransfer;
                }

                dragImageElementFn = $parse(dragImageElementId);

                scope.$apply(function() {
                    var elementId = dragImageElementFn(scope, {$event: e}),
                        dragElement;

                    if (!(elementId && angular.isString(elementId))) {
                        return;
                    }

                    dragElement = document.getElementById(elementId);

                    if (!dragElement) {
                        return;
                    }

                    e.dataTransfer.setDragImage(dragElement, 0, 0);
                });
            }

            function dragstartHandler(e) {
                if(e.originalEvent) {
                  e.dataTransfer = e.originalEvent.dataTransfer;
                }

                var isDragAllowed = !isDragHandleUsed || dragTarget.classList.contains(dragHandleClass);

                if (isDragAllowed) {
                    var sendChannel = attrs.dragChannel || 'defaultchannel';
                    var dragData = '';
                    if (attrs.drag) {
                        dragData = scope.$eval(attrs.drag);
                    }

                    var dragImage = attrs.dragImage || null;

                    element.addClass(draggingClass);
                    element.bind('$destroy', dragendHandler);

                    //Code to make sure that the setDragImage is available. IE 10, 11, and Opera do not support setDragImage.
                    var hasNativeDraggable = !(document.uniqueID || window.opera);

                    //If there is a draggable image passed in, then set the image to be dragged.
                    if (dragImage && hasNativeDraggable) {
                        var dragImageFn = $parse(attrs.dragImage);
                        scope.$apply(function() {
                            var dragImageParameters = dragImageFn(scope, {$event: e});
                            if (dragImageParameters) {
                                if (angular.isString(dragImageParameters)) {
                                    dragImageParameters = $dragImage.generate(dragImageParameters);
                                }
                                if (dragImageParameters.image) {
                                    var xOffset = dragImageParameters.xOffset || 0,
                                        yOffset = dragImageParameters.yOffset || 0;
                                    e.dataTransfer.setDragImage(dragImageParameters.image, xOffset, yOffset);
                                }
                            }
                        });
                    } else if (attrs.dragImageElementId) {
                        setDragElement(e, attrs.dragImageElementId);
                    }

                    var offset = {x: e.offsetX, y: e.offsetY};
                    var transferDataObject = {data: dragData, channel: sendChannel, offset: offset};
                    var transferDataText = angular.toJson(transferDataObject);

                    e.dataTransfer.setData('text', transferDataText);
                    e.dataTransfer.effectAllowed = 'copyMove';

                    $rootScope.$broadcast('ANGULAR_DRAG_START', e, sendChannel, transferDataObject);
                }
                else {
                    e.preventDefault();
                }
            }
        };
    }
    ]);

    module.directive('uiOnDrop', ['$parse', '$rootScope', function($parse, $rootScope) {
        return function(scope, element, attr) {
            var dragging = 0; //Ref. http://stackoverflow.com/a/10906204
            var dropChannel = attr.dropChannel || 'defaultchannel';
            var dragChannel = '';
            var dragEnterClass = attr.dragEnterClass || 'on-drag-enter';
            var dragHoverClass = attr.dragHoverClass || 'on-drag-hover';
            var customDragEnterEvent = $parse(attr.onDragEnter);
            var customDragLeaveEvent = $parse(attr.onDragLeave);

            function calculateDropOffset(e) {
                var offset = {
                    x: e.offsetX,
                    y: e.offsetY
                };
                var target = e.target;

                while (target !== element[0]) {
                    offset.x = offset.x + target.offsetLeft;
                    offset.y = offset.y + target.offsetTop;

                    target = target.offsetParent;
                    if (!target) {
                        return null;
                    }
                }

                return offset;
            }

            function onDragOver(e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                var uiOnDragOverFn = $parse(attr.uiOnDragOver);
                scope.$evalAsync(function() {
                    uiOnDragOverFn(scope, {$event: e, $channel: dropChannel});
                });

                return false;
            }

            function onDragLeave(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }

                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                dragging--;

                if (dragging === 0) {
                    scope.$evalAsync(function() {
                        customDragLeaveEvent(scope, {$event: e, $channel: dropChannel});
                    });
                    element.addClass(dragEnterClass);
                    element.removeClass(dragHoverClass);
                }

                var uiOnDragLeaveFn = $parse(attr.uiOnDragLeave);
                scope.$evalAsync(function() {
                    uiOnDragLeaveFn(scope, {$event: e, $channel: dropChannel});
                });
            }

            function onDragEnter(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }

                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                if (dragging === 0) {
                    scope.$evalAsync(function() {
                        customDragEnterEvent(scope, {$event: e, $channel: dropChannel});
                    });
                    element.removeClass(dragEnterClass);
                    element.addClass(dragHoverClass);
                }
                dragging++;

                var uiOnDragEnterFn = $parse(attr.uiOnDragEnter);
                scope.$evalAsync(function() {
                    uiOnDragEnterFn(scope, {$event: e, $channel: dropChannel});
                });

                $rootScope.$broadcast('ANGULAR_HOVER', dragChannel);
            }

            function onDrop(e) {
                if(e.originalEvent) {
                  e.dataTransfer = e.originalEvent.dataTransfer;
                }

                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }
                if (e.stopPropagation) {
                    e.stopPropagation(); // Necessary. Allows us to drop.
                }

                var sendData = e.dataTransfer.getData('text');
                sendData = angular.fromJson(sendData);

                var dropOffset = calculateDropOffset(e);
                
                var position = dropOffset ? {
                    x: dropOffset.x - sendData.offset.x,
                    y: dropOffset.y - sendData.offset.y
                } : null;
                
                determineEffectAllowed(e);

                var uiOnDropFn = $parse(attr.uiOnDrop);
                scope.$evalAsync(function() {
                    uiOnDropFn(scope, {$data: sendData.data, $event: e, $channel: sendData.channel, $position: position});
                });
                element.removeClass(dragEnterClass);
                dragging = 0;
            }
            
            function isDragChannelAccepted(dragChannel, dropChannel) {
                if (dropChannel === '*') {
                    return true;
                }

                var channelMatchPattern = new RegExp('(\\s|[,])+(' + dragChannel + ')(\\s|[,])+', 'i');

                return channelMatchPattern.test(',' + dropChannel + ',');
            }

            function preventNativeDnD(e) {
                if(e.originalEvent) {
                  e.dataTransfer = e.originalEvent.dataTransfer;
                }

                if (e.preventDefault) {
                    e.preventDefault();
                }
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                e.dataTransfer.dropEffect = 'none';
                return false;
            }

            var deregisterDragStart = $rootScope.$on('ANGULAR_DRAG_START', function(_, e, channel, transferDataObject) {
                dragChannel = channel;

                var valid = true;

                if (!isDragChannelAccepted(channel, dropChannel)) {
                    valid = false;
                }

                if (valid && attr.dropValidate) {
                    var validateFn = $parse(attr.dropValidate);
                    valid = validateFn(scope, {
                        $drop: {scope: scope, element: element},
                        $event: e,
                        $data: transferDataObject.data,
                        $channel: transferDataObject.channel
                    });
                }

                if (valid) {
                    element.bind('dragover', onDragOver);
                    element.bind('dragenter', onDragEnter);
                    element.bind('dragleave', onDragLeave);
                    element.bind('drop', onDrop);

                    element.addClass(dragEnterClass);
                } else {
                    element.bind('dragover', preventNativeDnD);
                    element.bind('dragenter', preventNativeDnD);
                    element.bind('dragleave', preventNativeDnD);
                    element.bind('drop', preventNativeDnD);

                    element.removeClass(dragEnterClass);
                }

            });


            var deregisterDragEnd = $rootScope.$on('ANGULAR_DRAG_END', function() {
                element.unbind('dragover', onDragOver);
                element.unbind('dragenter', onDragEnter);
                element.unbind('dragleave', onDragLeave);

                element.unbind('drop', onDrop);
                element.removeClass(dragHoverClass);
                element.removeClass(dragEnterClass);

                element.unbind('dragover', preventNativeDnD);
                element.unbind('dragenter', preventNativeDnD);
                element.unbind('dragleave', preventNativeDnD);
                element.unbind('drop', preventNativeDnD);
            });

            scope.$on('$destroy', function() {
                deregisterDragStart();
                deregisterDragEnd();
            });


            attr.$observe('dropChannel', function(value) {
                if (value) {
                    dropChannel = value;
                }
            });


        };
    }
    ]);

    module.constant('$dragImageConfig', {
        height: 20,
        width: 200,
        padding: 10,
        font: 'bold 11px Arial',
        fontColor: '#eee8d5',
        backgroundColor: '#93a1a1',
        xOffset: 0,
        yOffset: 0
    });

    module.service('$dragImage', ['$dragImageConfig', function(defaultConfig) {
        var ELLIPSIS = '…';

        function fitString(canvas, text, config) {
            var width = canvas.measureText(text).width;
            if (width < config.width) {
                return text;
            }
            while (width + config.padding > config.width) {
                text = text.substring(0, text.length - 1);
                width = canvas.measureText(text + ELLIPSIS).width;
            }
            return text + ELLIPSIS;
        }

        this.generate = function(text, options) {
            var config = angular.extend({}, defaultConfig, options || {});
            var el = document.createElement('canvas');

            el.height = config.height;
            el.width = config.width;

            var canvas = el.getContext('2d');

            canvas.fillStyle = config.backgroundColor;
            canvas.fillRect(0, 0, config.width, config.height);
            canvas.font = config.font;
            canvas.fillStyle = config.fontColor;

            var title = fitString(canvas, text, config);
            canvas.fillText(title, 4, config.padding + 4);

            var image = new Image();
            image.src = el.toDataURL();

            return {
                image: image,
                xOffset: config.xOffset,
                yOffset: config.yOffset
            };
        };
    }
    ]);

}(angular));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = 'ang-drag-drop';


/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div class=atp-segment-item-wrapper><div class=atp-segment-item ng-repeat=\"item in segment\" ng-class=\"[item.segmentType, {'highlighted': (item.id === highlightedItem.id)}]\" ng-mouseenter=onHoverEvent(item) ng-mouseleave=onHoverEvent() ng-click=onClickEvent(item)></div></div>";

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "<div class=atp-container><div class=atp-head><div class=atp-row><div class=\"atp-cell atpr-title\">{{locale.labels.rowTitle}}</div><div class=\"atp-cell atpr-counter\" ng-if=options.needCounter>{{locale.labels.counterTitle.hours}}</div><div class=\"atp-cell week-day atp-segment\" ng-repeat=\"segment in segments\">{{segment}}</div></div></div><div class=atp-row ng-repeat=\"row in rows\" drop-channel=\"{{options.editable && row.editable && options.dropChannel}}\" ui-on-drop=\"onDropEvent($data, row.id)\" time-planner-row></div></div>";

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<div class=\"atp-cell atpr-title\">{{row.title}}</div><div class=\"atp-cell atpr-counter\" ng-if=options.needCounter>{{row.hours || 0}}</div><div class=\"atp-cell week-day atp-segment\" ng-repeat=\"segment in row.segments\" time-planner-cell></div>";

/***/ }),
/* 12 */
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
webpackContext.id = 12;

/***/ })
/******/ ]);
});
//# sourceMappingURL=angular-time-planner.js.map