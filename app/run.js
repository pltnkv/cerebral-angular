import {
  addTodo,
  setNewTodoTitle,
  setVisibleTodos,
  resetNewTodoTitle,
  countTodos,
  toggleAllCompleted,
  toggleCompleted,
  removeTodo
} from './actions.js';

export default function (cerebral, $http) {

  cerebral.signals({
    'newTodoSubmitted': [addTodo, resetNewTodoTitle, countTodos],
    'completeAllToggled': [toggleAllCompleted, countTodos],
    'newTodoTitleChanged': [setNewTodoTitle],
    'completedToggled': [toggleCompleted],
    'todoRemoved': [removeTodo, countTodos]
  });

};
