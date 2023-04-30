Vue.createApp({
  data() {
    return {
      todo: "",
      todoItems: [],
      hasInput: false,
      maxId: 0,
    };
  },
  mounted() {
    // localStorage への書き込みを一度もしてない場合には実施しない
    if (localStorage.length === 0) return;
    this.todoItems = JSON.parse(localStorage.getItem("todoItems"));
    this.loadMaxId();
  },
  beforeUpdate() {
    localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
  },
  methods: {
    loadMaxId() {
      const ids = this.todoItems.map((todo) => {
        return todo.id;
      });
      // リロード後にコンテンツがない場合は０スタート、それ以外の場合はIDを上書きしないように最大値の次からスタート
      this.maxId = ids.length == 0 ? 0 : Math.max.apply(null, ids) + 1;
    },
    add(todo) {
      this.hasInput = true;

      if (todo.length !== 0) {
        this.todoItems.push({
          id: this.maxId++,
          text: todo,
          isEdit: false,
        });
        this.todo = "";
        this.hasInput = false;
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
      return this.hasInput === true && this.todo.length === 0;
    },
  },
}).mount("#todoList");
