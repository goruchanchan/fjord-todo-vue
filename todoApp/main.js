window.addEventListener("DOMContentLoaded", () => {
  Vue.createApp({
    data() {
      return {
        newTodoText: "",
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
      localStorage.setItem("maxId", this.maxId.toString());
    },
    computed: {
      noInput() {
        return this.isAddingTodo === true && this.newTodoText.length === 0;
      },
    },
    methods: {
      loadTodoItems() {
        const tempLocalStorageTodoItems = localStorage.getItem("todoItems");
        if (tempLocalStorageTodoItems === null) return;
        this.todoItems = JSON.parse(tempLocalStorageTodoItems);
      },
      loadMaxId() {
        const tempMaxId = localStorage.getItem("maxId");
        if (tempMaxId === null) return;
        this.maxId = Number(tempMaxId);
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
        this.todoItems = this.todoItems.filter(
          (todo) => !_.isEqual(todo, targetTodo)
        );
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
