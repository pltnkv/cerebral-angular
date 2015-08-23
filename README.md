# cerebral-angular
Angular View layer package for Cerebral

## More info on Cerebral and video introduction
Cerebral main repo is located [here](https://github.com/christianalfoni/cerebral) and a video demonstration can be found [here](https://www.youtube.com/watch?v=xCIv4-Q2dtA).

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

};
```

### Included services
The default inputs also includes default services from Angular.

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

### Recording
With the Cerebral controller you can record and replay state changes.

*components/MyComponent.js*
```js
export default function () {
  return {
    controllerAs: 'myComponent',
    scope: {},
    templateUrl: 'myComponent.html',
    controller: function ($scope, cerebral) {

      // Start recording by passing the initial state of the recording
      cerebral.recorder.record(controller.get());

      // Stop recording
      cerebral.recorder.stop();

      // Seek to specific time and optionally start playback
      cerebral.recorder.seek(0, true);

    }
  };
};
```

## Try it out
1. Clone repo
2. `npm install`
3. `npm start`
4. Go to `localhost:8080`
