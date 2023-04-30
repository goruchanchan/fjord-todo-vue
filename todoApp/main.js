Vue.createApp({
  data() {
    return {
      newTodo: "",
      todoItems: [],
      hasInput: false,
      maxId: 0,
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
  beforeUpdate() {
    localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
  },
  methods: {
    addTodo() {
      this.hasInput = true;

      if (this.newTodo.length !== 0) {
        this.todoItems.push({
          id: this.maxId++,
          text: this.newTodo,
          isEdit: false,
        });
        this.newTodo = "";
        this.hasInput = false;
      }
    },
    removeTodo(targetTodo) {
      this.todoItems = this.todoItems.filter((todo) => todo !== targetTodo);
    },
    editTodo(targetTodo) {
      if (targetTodo.isEdit) {
        this.todoItems.map((todo) =>
          todo.id === targetTodo.id ? { ...todo, ...targetTodo } : todo
        );
      }
      targetTodo.isEdit = !targetTodo.isEdit;
    },
    editMessage(targetTodo) {
      return targetTodo.isEdit ? "確定" : "編集";
    },
    noInput() {
      return this.hasInput === true && this.newTodo.length === 0;
    },
  },
}).mount("#todoList");
