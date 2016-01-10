export default {
  addTodo({state}) {
    let ref = state.get('nextRef');

    state.set(['todos', ref], {
      $ref: ref,
      $isSaving: true,
      title: state.get('newTodoTitle'),
      completed: false
    });
    state.set('nextRef', ++ref);

    return {
      ref: ref
    };

  },
  resetNewTodoTitle({state}) {
    state.set('newTodoTitle', '');
  },
  setNewTodoTitle({input, state}) {
    state.set('newTodoTitle', input.title);
  },
  countTodos({state}) {
    const todos = state.get('todos');
    const count = Object.keys(todos).reduce(function (count, todoRef) {
      if (todos[todoRef].completed) {
        count.completed++;
      } else {
        count.remaining++;
      }
      return count;
    }, {remaining: 0, completed: 0});
    state.merge({
      remainingCount: count.remaining,
      completedCount: count.completed
    });
  },
  toggleAllCompleted({state}) {
      const isAllCompleted = state.get('isAllCompleted');
      const visibleTodos = state.get('visibleTodos').forEach(function (todo) {
        if (isAllCompleted) {
          state.set(['todos', todo.$ref, 'completed'], false);
        } else {
          state.set(['todos', todo.$ref, 'completed'], true);
        }
      });
  },
  toggleCompleted({input, state}) {
    const todo = state.get(['todos', input.ref]);
    state.set(['todos', input.ref, 'completed'], !todo.completed);
  },
  removeTodo({input, state}) {
    state.unset('todos', [input.ref]);
  }
};
