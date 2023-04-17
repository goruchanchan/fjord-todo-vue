let vm = new Vue({
  el: "#list",
  data: {
    newTodo: "",
    errorMessage: "",
    todos: [],
  },
  mounted() {
    if (localStorage.length > 0 && localStorage.todos !== "")
      this.todos = localStorage.getItem("todos").split(",");
  },
  methods: {
    addTodo() {
      if (this.newTodo.length !== 0) {
        this.todos.push(this.newTodo);
        localStorage.setItem("todos", this.todos);
        this.newTodo = "";
        this.errorMessage = "";
      } else {
        this.errorMessage = "タスク内容を入力してください";
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      localStorage.setItem("todos", this.todos);
    },
    editTodo(index, todo) {
      this.todos[index] = todo;
      localStorage.setItem("todos", this.todos);
    },
    hasInput() {
      return this.newTodo.length > 0;
    },
  },
});
