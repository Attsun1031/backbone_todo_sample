define(["models/todo", "collections/todos", "views/todo", "backbone"], function(Todo, TodoList, TodoView) {
  // Application View
  var AppView = Backbone.View.extend({
    el: $("#todoapp"),

    statsTemplate: _.template($('#stats-template').html()),

    events: {
      "keypress #new-todo"     : "createOnEnter",
      "click #clear-completed" : "clearCompleted",
      "click #toggle-all"      : "toggleAllComplete"
    },

    initialize: function() {
      this.todos = new TodoList();
      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];

      this.listenTo(this.todos, 'add', this.addOne);
      this.listenTo(this.todos, 'reset', this.addAll);
      this.listenTo(this.todos, 'all', this.render);

      this.footer = this.$('footer');
      this.main = $('#main');

      this.todos.fetch();
    },

    render: function() {
      var done = this.todos.done().length;
      var remaining = this.todos.remaining().length;

      if (this.todos.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },

    addAll: function() {
      this.todos.each(this.addOne, this);
    },

    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      this.todos.create({title: this.input.val()});
      this.input.val('');
    },

    clearCompleted: function() {
      _.invoke(this.todos.done(), 'destroy');
      return false;
    },

    toggleAllComplete: function() {
      var done = this.allCheckbox.checked;
      this.todos.each(function(todo) { todo.save({'done': done}); });
    }
  });
  return AppView;
});
