let vm = new Vue({
  el: "#list",
  data: {
    newTodo: "",
    errorMessage: "",
    count: localStorage.length,
    todos: localStorage,
  },
  methods: {
    addTodo() {
      if (this.newTodo.length !== 0) {
        localStorage.setItem(this.count, this.newTodo);
        this.count++;
        this.newTodo = "";
        this.errorMessage = "";
      }else{
        this.errorMessage = "タスク内容を入力してください"
      }
    },
    removeTodo(item) {
      localStorage.removeItem(item.key);
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
    hasInput(){
      return this.newTodo.length > 0
    }
  },
});
