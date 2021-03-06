/**
 * @deprecated replaced by trackOn
 * @ngdoc directive
 * @require atInternetProvider
 * @name atInternetClick
 * @description
 * Simple attribute directive to track clicks on DOM elements.
 * Value of attribute is an object to be sent, see {@link atInternet trackClick()}.
 *
 * Example:
 * ```html
 * <button at-internet-click="{ name: 'foo' }" ng-click="clickMe()">ClickMe</button>
 * ```
 */
export /* @ngInject */ function atInternetClickDirective(atInternet) {
  return {
    restrict: 'A',
    scope: {
      atInternetClick: '=',
    },
    compile() {
      return {
        post($scope, $element) {
          $element.bind('click', () => {
            const clickData = $scope.atInternetClick;

            // set defaults type to action if not specified
            if (!clickData.type) {
              clickData.type = 'action';
            }
            atInternet.trackClick(clickData);
          });
        },
      };
    },
  };
}

/**
 * @ngdoc directive
 * @require atInternetProvider
 * @name trackOn
 * @description
 * Simple attribute directive to track events on DOM elements.
 *
 * Example:
 * ```html
 * <button data-track-on="click" data-track-name="MyAction" data-track-type="navigation"></button>
 * ```
 */
export /* @ngInject */ function trackOnDirective(atInternet) {
  return {
    restrict: 'A',
    scope: {
      trackOn: '@',
      trackName: '@',
      trackType: '@',
    },
    link($scope, $element, $attr) {
      $element.on($scope.trackOn, () => {
        const clickData = {
          name: $attr.trackName || (`${$attr.id}-${$scope.trackOn}`),
          type: $attr.trackType || 'action',
        };

        atInternet.trackClick(clickData);
      });
    },
  };
}

export default {
  atInternetClickDirective,
  trackOnDirective,
};
