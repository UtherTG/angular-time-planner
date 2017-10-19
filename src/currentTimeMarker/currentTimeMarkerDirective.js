angular
  .module('currentTimeMarkerDirective', [])
  .directive('currentTimeMarker', ['$interval', ($interval) => {
    const link = (scope, element) => {
      let interval, initialOffset, parentWidth, segmentsWidth;

      angular.element(_setStartPosition);
      scope.$watch('options.timeScope', _updatePosition);

      function _setStartPosition() {
        let segment, parent;

        initialOffset = (segment = document.querySelector('.atp-items-wrapper .atp-segment')) ?
          segment.offsetLeft : 0;
        parentWidth = (parent = document.querySelector('.atp-items-wrapper')) ?
          parent.offsetWidth : 0;

        segmentsWidth = parentWidth - initialOffset;
        element.css({left: `${initialOffset}px`});
        _updatePosition();
      }

      function _updatePosition() {
        const offset = initialOffset + _calculateOffset();
        console.log(document.querySelector('.atp-items-wrapper .atp-segment'));
        console.log(initialOffset, _calculateOffset());
        element.css({
          left: `${offset}px`,
          opacity: offset ? 1 : 0
        });
      }

      function _calculateOffset() {
        switch (scope.options.timeScope) {
          case 'day': return _calculateOffsetForDay();
          case 'week': return _calculateOffsetForWeek();
          case 'range': return 0;
        }
      }

      function _calculateOffsetForDay() {
        const
          now = new Date(),
          hour = now.getHours(),
          quarter = Math.floor(now.getMinutes() / 15);
        return (segmentsWidth / 24) * (hour + 0.25 * (quarter > 0 ? quarter : 0));
      }

      function _calculateOffsetForWeek() {
        const
          now = new Date(),
          day = now.getDay(),
          quarter = Math.floor(now.getHours() / 6);
        return (segmentsWidth / 7) * (day + 0.25 * (quarter > 0 ? quarter : 0));
      }

      // Live update
      interval = $interval(function() {
        _updatePosition();
      }, 60000);
      element.on('$destroy', function() {
        $interval.cancel(interval);
      });
    };

    return {
      restrict: 'E',
      link: link,
      template: '<div></div>'
    };
  }]);
