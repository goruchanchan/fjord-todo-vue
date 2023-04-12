let vm = new Vue({
  el: "#list",
  data: {
    newTodo: "",
    todos: localStorage,
  },
  methods: {
    addTodo() {
      localStorage.setItem(localStorage.length + 1, this.newTodo);
      this.newTodo = "";
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
  },
});
