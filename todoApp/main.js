var maxId = 0;

Vue.createApp({
  data() {
    return {
      newTodo: "",
      errorMessage: "",
      todoItems: [],
    };
  },
  mounted() {
    if (localStorage.length > 0) {
      this.todoItems = JSON.parse(localStorage.getItem("todoItems"));
      const ids = this.todoItems.map((todo) => {
        return todo.id;
      });
      maxId = Math.max.apply(null, ids) + 1; // リロード後にIDを上書きしないように最大値の次からスタート
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.length !== 0) {
        this.todoItems.push({
          id: maxId++,
          text: this.newTodo,
          isEdit: false,
        });

        localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
        this.newTodo = "";
        this.errorMessage = "";
      } else {
        this.errorMessage = "ToDoを入力してください";
      }
    },
    removeTodo(targetTodo) {
      this.todoItems = this.todoItems.filter((todo) => todo !== targetTodo);
      localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
    },
    isEdit(todo) {
      console.log(todo);
    },
    editTodo(index, todo) {
      this.todoItems[index] = todo;
      localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
    },
    hasInput() {
      return this.newTodo.length > 0;
    },
  },
}).mount("#todoList");
