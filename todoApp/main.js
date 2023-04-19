new Vue({
  el: "#todoList",
  data: function () {
    return {
      newTodo: "",
      errorMessage: "",
      todoItems: [],
    };
  },
  mounted() {
    if (localStorage.length > 0 && localStorage.todoItems !== "")
      this.todoItems = localStorage.getItem("todoItems").split(",");
  },
  methods: {
    addTodo() {
      if (this.newTodo.length !== 0) {
        this.todoItems.push(this.newTodo);
        localStorage.setItem("todoItems", this.todoItems);
        this.newTodo = "";
        this.errorMessage = "";
      } else {
        this.errorMessage = "タスク内容を入力してください";
      }
    },
    removeTodo(index) {
      this.todoItems.splice(index, 1);
      localStorage.setItem("todoItems", this.todoItems);
    },
    editTodo(index, todo) {
      this.todoItems[index] = todo;
      localStorage.setItem("todoItems", this.todoItems);
    },
    hasInput() {
      return this.newTodo.length > 0;
    },
  },
});
