var angular = global.angular || require('angular');

var getValue = function (path, obj) {
  path = path.slice();
  while (path.length) {
    obj = obj[path.shift()];
  }
  return obj;
};

angular.module('cerebral', [])
  .provider('cerebral', function () {

    var services = ['$http'];
    var controller = null;
    var defaultArgs = {};

    this.setController = function (controllerInstance) {
      controller = controllerInstance;
    };

    this.$get = services.concat([function () {

      // Add default services
      var args = arguments;
      services.forEach(function (service, index) {
        controller.services[service] = args[index];
      });

      // Create state injection method
      controller.injectState = function ($scope, paths) {

        var update = function (preventDigest) {
          var newState = controller.get();
          Object.keys(paths).forEach(function (key) {
            $scope[key] = getValue(paths[key], newState);
          });
          !preventDigest && $scope.$apply();
        };

        $scope.$on('$destroy', function () {
          controller.off('change', update);
        });

        controller.on('change', update);
        controller.on('remember', update);
        update(true);

      };

      return controller;
    }]);
  });

module.exports = angular;
