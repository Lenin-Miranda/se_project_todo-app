import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const todoCounter = new TodoCounter(initialTodos, ".counter__text");
const addTodoForm = document.forms["add-todo-form"];

// Function to generate a new Todo item
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", todoCounter);

  return todo.getView();
};

// Initialize Section
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    return todo;
  },
  containerSelector: ".todos__list",
});

// Initialize Form Validator
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

// Initialize Popup with Form Submission Handling

// Update the counter when a new task is added
const popup = new PopupWithForm({
  selector: "#add-todo-popup",
  openBtnSelector: ".button_action_add",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id, completed: false };

    const todo = generateTodo(values);
    section.addItem(todo);

    todoCounter.updateTotal(1);

    newTodoValidator.resetValidation();
    popup.close();
  },
});

// Set Event Listeners
popup.setEventListener();
newTodoValidator.enableValidation();
section.renderItems();
