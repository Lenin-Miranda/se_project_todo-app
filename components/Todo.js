class Todo {
  constructor(data, selector) {
    this.id = data.id;
    this.name = data.name;
    this.completed = false;
    this.date = data.date;
    this._data = data;
    this._todoTemplate = document.querySelector(selector);
  }

  _getCheckboxElement() {
    this.todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this.todoLabel = this._todoElement.querySelector(".todo__label");
    this.todoCheckboxEl.id = `todo-${this.id}`;
    this.todoCheckboxEl.checked = this.completed;
    this.todoLabel.setAttribute("for", `todo-${this.id}`);
  }

  _setEventListeners() {
    this.todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });

    this.todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }
  getView() {
    this._todoElement = this._todoTemplate.content
      .querySelector(".todo")
      .cloneNode(true);
    this.todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    this._getCheckboxElement();
    this._setEventListeners();
    todoNameEl.textContent = this.name;

    const dueDate = new Date(this.date);

    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    return this._todoElement;
  }
}

export default Todo;
