import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import { monkey } from 'baobab';

const hasTodos = monkey({
  cursors: {
    todos: ['todos']
  },
  get: function (data) {
    return !!Object.keys(data.todos).length
  }
});

const visibleTodos = monkey({
  cursors: {
    todos: ['todos']
  },
  get: function (data) {
    return Object.keys(data.todos).map(key => data.todos[key])
  }
});

const isAllCompleted = monkey({
  cursors: {
    visibleTodos: ['visibleTodos']
  },
  get: function (data) {
    return data.visibleTodos.reduce(function (isAllCompleted, todo) {
      if (!todo.completed) {
        return false;
      }
      return isAllCompleted;
    }, true);
  }
});

const model = Model({
  nextRef: 0,
  isSaving: false,
  newTodoTitle: '',
  remainingCount: 0,
  completedCount: 0,
  todos: {},
  hasTodos: hasTodos,
  visibleTodos: visibleTodos,
  filter: 'all',
  isAllCompleted: isAllCompleted
});

export default Controller(model);
