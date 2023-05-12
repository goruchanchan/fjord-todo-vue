window.addEventListener("DOMContentLoaded", () => {
  Vue.createApp({
    data() {
      return {
        newTodoText: "",
        editingText: "",
        todoItems: [],
        isAddingTodo: false,
        maxId: 0,
      };
    },
    mounted() {
      this.loadTodoItems();
      this.loadMaxId();
    },
    beforeUpdate() {
      localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
      localStorage.setItem("maxId", this.maxId);
    },
    computed: {
      noInput() {
        return this.isAddingTodo === true && this.newTodoText.length === 0;
      },
    },
    methods: {
      loadTodoItems() {
        const localStorageTodoItems = localStorage.getItem("todoItems");
        if (localStorageTodoItems === null) return;
        this.todoItems = JSON.parse(localStorageTodoItems);
      },
      loadMaxId() {
        this.maxId = Number(localStorage.getItem("maxId"));
      },
      add() {
        this.isAddingTodo = true;

        if (this.newTodoText.length !== 0) {
          this.todoItems.push({
            id: this.maxId,
            text: this.newTodoText,
            editingText: this.newTodoText,
            isEditing: false,
          });
          this.maxId++;
          this.newTodoText = "";
          this.isAddingTodo = false;
        }
      },
      remove(targetTodo) {
        this.todoItems = this.todoItems.filter((todo) => todo != targetTodo);
      },
      switchEditingState(targetTodo) {
        targetTodo.isEditing = !targetTodo.isEditing;
        if (targetTodo.isEditing) {
          targetTodo.editingText = targetTodo.text;
        } else {
          targetTodo.text = targetTodo.editingText;
        }
      },
      editButtonText(targetTodo) {
        return targetTodo.isEditing ? "確定" : "編集";
      },
      cancelEdit(targetTodo) {
        targetTodo.isEditing = false;
      },
    },
  }).mount("#todoList");
});
