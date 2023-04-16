let vm = new Vue({
  el: "#list",
  data: {
    newTodo: "",
    errorMessage: "",
    todos: localStorage,
  },
  methods: {
    addTodo() {
      if (this.newTodo.length !== 0) {
        localStorage.setItem(localStorage.length + 1, this.newTodo);
        this.newTodo = "";
        this.errorMessage = "";
      } else {
        this.errorMessage = "タスク内容を入力してください";
      }
    },
    removeTodo(item) {
      localStorage.removeItem(item.key);
    },
    sortLocalStorage() {
      return Object.keys(localStorage)
        .sort((a, b) => a - b)
        .map((key) => {
          return {
            key: key,
            value: localStorage.getItem(key),
          };
        });
    },
    hasInput() {
      return this.newTodo.length > 0;
    },
  },
});
