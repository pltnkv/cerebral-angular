export default function () {
  return {
    controllerAs: 'todoMVC',
    scope: {},
    templateUrl: 'TodoMVC.html',
    controller: function ($scope, state, signals) {

      state.inject($scope, {
        isSaving: ['isSaving'],
        newTodoTitle: ['newTodoTitle']
      });

      $scope.newTodoTitleChanged = function () {
        signals.newTodoTitleChanged({title: $scope.newTodoTitle});
      };
      $scope.newTodoSubmitted = signals.newTodoSubmitted;

    }
  };
};
