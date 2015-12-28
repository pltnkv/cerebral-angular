# cerebral-angular
Angular View layer package for Cerebral

## The Cerebral Webpage is now launched
You can access the webpage at [http://christianalfoni.com/cerebral/](http://christianalfoni.com/cerebral/)

## Debugger
You can download the Chrome debugger [here](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb?hl=no).

## Install
`npm install cerebral-angular`

## API
All examples are shown with ES6 syntax.

## Get started
We are going to use a file structure where we use `main.js`, `run.js` and `config.js`

### The provider
*main.js*
```js
import 'cerebral-angular'; // Exposes module
import config from './config.js';

angular.module('app', ['cerebral'])
  .config(config)
```

*config.js*
```js
// The controller you have created for your app,
// as explained in the chosen MODEL package
import controller from './controller.js';

export default function (cerebralProvider) {

  // Sets the controller for the application
  cerebralProvider.setController(controller);
  // Defines angular injectable services exposed to actions
  cerebralProvider.setServices(['$http', '$resource']);

};
```

### Services
Services defined in `cerebralProvider.setServices()` call will be available in services object passed as fourth argument to actions. By default the `$http` service is available.

```js
const someAction = function someAction (input, state, output, services) {
  services.$http // Do server fetching etc.
};
```

### Trigger a signal
*components/MyComponent.js*
```js
export default function () {
  return {
    controllerAs: 'myComponent',
    scope: {},
    templateUrl: 'myComponent.html',
    controller: function ($scope, cerebral) {

      // Trigger signals
      $scope.addItemClicked = function () {
        cerebral.signals.addItemClicked({
          item: 'foo'
        });
      };

    }
  };
};
```

### Get state
When running the application you need to grab the initial state of the application. You can do this with the exposed "get" method.

*components/MyComponent.js*
```js
export default function () {
  return {
    controllerAs: 'myComponent',
    scope: {},
    templateUrl: 'myComponent.html',
    controller: function ($scope, cerebral) {

      // Adds a "list" prop to the $scope which
      // will automatically update when the list
      // updates
      cerebral.injectState($scope, {
        list: ['list']
      });

      // You can also make a mutable version of the
      // the state, which is often useful if you want
      // to change an existing entity
      cerebral.injectMutableState($scope, {
        user: ['user']
      });

      // Trigger signals
      $scope.addItemClicked = function () {
        cerebral.signals.addItemClicked({
          item: 'foo'
        });
      };

    }
  };
};
```

#### Get state using 'bindToController'
```js
export default function () {
  return {
    controllerAs: 'myComponent',
    bindToController: true,
    scope: {},
    template: `<div>  {{myComponent.list}}  </div>`
    controller: function ($scope, cerebral) {

      cerebral.injectState($scope, {
        list: ['list']
      }, this); // pass in an optional argument
                // to which the properties are attached to.

      cerebral.injectMutableState($scope, {
        user: ['user']
      }, this);

    }
  };
};
```
