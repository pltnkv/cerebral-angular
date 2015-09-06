var angular = global.angular || require('angular');

var makeMutable = function (obj) {
  if (obj instanceof Array) {
    return obj.map(function (obj) {
      return makeMutable(obj);
    });
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce(function (newObj, key) {
      newObj[key] = makeMutable(obj[key]);
      return newObj;
    }, {});
  } else {
    return obj;
  }
};

angular.module('cerebral', [])
  .provider('cerebral', function () {

    var services = ['$http'];
    var controller = null;
    var defaultArgs = {};

    this.setController = function (controllerInstance) {
      controller = controllerInstance;
    };

    this.setServices = function (requiredServices) {
      requiredServices = requiredServices || [];
      services = requiredServices
    };

    this.$get = ['$injector', function ($injector) {

      // Add default services
      var args = arguments;
      services.forEach(function (service, index) {
        controller.services[service] = $injector.get(service);
      });

      // Create state injection method
      controller.injectState = function ($scope, paths, isMutable) {

        var update = function (preventDigest) {
          Object.keys(paths).forEach(function (key) {
            $scope[key] = isMutable ? makeMutable(controller.get(paths[key])) : controller.get(paths[key]);
          });
          !preventDigest && $scope.$apply();
        };

        $scope.$on('$destroy', function () {
          controller.removeListener('change', update);
        });

        controller.on('change', update);
        update(true);

      };

      controller.injectMutableState = function ($scope, paths) {
        controller.injectState($scope, paths, true);
      };

      return controller;
    }];
  })
  .run(['cerebral', function (cerebral) {
    cerebral.devtools.start();
  }]);

module.exports = angular;
