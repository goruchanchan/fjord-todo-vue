Vue.createApp({
  data() {
    return {
      newTodo: "",
      errorMessage: "",
      todoItems: [],
      maxId: 0
    };
  },
  mounted() {
    if (localStorage.length > 0) {
      this.todoItems = JSON.parse(localStorage.getItem("todoItems"));
      const ids = this.todoItems.map((todo) => {
        return todo.id;
      });
      this.maxId = Math.max.apply(null, ids) + 1; // リロード後にIDを上書きしないように最大値の次からスタート
    }
  },
  updated() {
    localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
  },
  methods: {
    addTodo() {
      if (this.newTodo.length !== 0) {
        this.todoItems.push({
          id: this.maxId++,
          text: this.newTodo,
          isEdit: false,
        });

        this.newTodo = "";
        this.errorMessage = "";
      } else {
        this.errorMessage = "ToDoを入力してください";
      }
    },
    removeTodo(targetTodo) {
      this.todoItems = this.todoItems.filter((todo) => todo !== targetTodo);
    },
    editTodo(targetTodo) {
      this.todoItems.map((todo) =>
        todo.id === targetTodo.id ? { ...todo, ...targetTodo } : todo
      );
    },
    hasInput() {
      return this.newTodo.length > 0;
    },
  },
}).mount("#todoList");
