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

var controller = null;

angular.module('cerebral', [])
  .service('signals', function () {
    return controller.getSignals();
  })
  .service('state', function () {
    var state = {
      inject: function ($scope, paths, viewModel, isMutable) {
        var update = function (preventDigest) {
          Object.keys(paths).forEach(function (key) {
            var val = isMutable ? makeMutable(controller.get(paths[key])) : controller.get(paths[key]);
            if(viewModel) {
              viewModel[key] = val;
            } else {
              $scope[key] = val;
            }
          });
          preventDigest !== true && $scope.$apply();
        };

        $scope.$on('$destroy', function () {
          controller.removeListener('change', update);
        });

        controller.on('change', update);
        update(true);
      },
      injectMutable: function ($scope, paths, viewModel) {
        state.injectState($scope, paths, viewModel, true);
      }
    }
    return state;
  })
  .provider('cerebral', function () {

    var defaultArgs = {};

    this.setController = function (controllerInstance) {
      controller = controllerInstance;
    };

    this.$get = ['$injector', function ($injector) {

      controller.services({
        '$http': $injector.get('$http')
      });

      return controller;
    }];
  })
  .run(['cerebral', function (cerebral) {
    cerebral.getDevtools().start();
    if (cerebral.getServices().router) {
      cerebral.getServices().router.trigger();
    }
  }]);

module.exports = angular;
