export default function () {
  return {
    controllerAs: 'todoList',
    scope: {},
    templateUrl: 'TodoList.html',
    controller: function ($scope, signals, state) {

      state.inject($scope, {
        todos: ['todos'],
        hasTodos: ['hasTodos'],
        isAllCompleted: ['isAllCompleted'],
        remainingCount: ['remainingCount'],
        visibleTodos: ['visibleTodos']
      });

      $scope.completeAllToggled = signals.completeAllToggled;

      $scope.completedToggled = function (ref) {
        signals.completedToggled({ref: ref});
      };

      $scope.todoRemoved = function (ref) {
        signals.todoRemoved({ref: ref});
      };

    }
  };
};
