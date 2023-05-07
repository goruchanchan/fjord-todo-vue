Vue.createApp({
  data() {
    return {
      newTodoText: "",
      todoItems: [],
      tryingAddTodo: false,
      maxId: 0,
    };
  },
  mounted() {
    const localStorageTodoItems = localStorage.getItem("todoItems");
    if (localStorageTodoItems === null) return;

    this.loadTodoItems(localStorageTodoItems);
    this.loadMaxId();
  },
  beforeUpdate() {
    localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
    localStorage.setItem("maxId", this.maxId);
  },
  methods: {
    loadTodoItems(localStorageTodoItems) {
      this.todoItems = JSON.parse(localStorageTodoItems);
    },
    loadMaxId() {
      this.maxId = localStorage.getItem("maxId");
    },
    add() {
      this.tryingAddTodo = true;

      if (this.newTodoText.length !== 0) {
        this.todoItems.push({
          id: this.maxId++,
          text: this.newTodoText,
          isEdit: false,
        });
        this.newTodoText = "";
        this.tryingAddTodo = false;
      }
    },
    remove(targetTodo) {
      this.todoItems = this.todoItems.filter((todo) => todo !== targetTodo);
    },
    edit(targetTodo) {
      if (targetTodo.isEdit) {
        this.todoItems.map((todo) =>
          todo.id === targetTodo.id ? { ...todo, ...targetTodo } : todo
        );
      }
      targetTodo.isEdit = !targetTodo.isEdit;
    },
    editBtnText(targetTodo) {
      return targetTodo.isEdit ? "確定" : "編集";
    },
    noInput() {
      return this.tryingAddTodo === true && this.newTodoText.length === 0;
    },
  },
}).mount("#todoList");
