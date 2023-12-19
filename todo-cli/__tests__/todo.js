const todoList = require("../todo");
let todos;

const formattedDate = (d) => {
  return d.toLocaleDateString("en-CA");
};

beforeEach(() => {
  todos = todoList(); // Reset todos before each test
});

describe("Todolist Test Suite", () => {
  test("Should add new todo", () => {
    const todoItemsCount = todos.all.length;
    todos.add({
      title: "Test todo",
      completed: false,
      dueDate: "2023-12-18", // Ensure dueDate is a string
    });
    expect(todos.all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    todos.add({
      title: "Test todo",
      completed: false,
      dueDate: "2023-12-18",
    });
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const yesterday = formattedDate(
      new Date(new Date().setDate(new Date().getDate() - 1))
    );
    const overdueic = todos.overdue().length;
    todos.add({ title: "Do Coding", dueDate: yesterday, completed: false });
    const overdueItems = todos.overdue();
    expect(overdueItems.length).toBe(overdueic + 1);
  });

  test("Should retrieve due today items", () => {
    const today = formattedDate(new Date());
    const duetic = todos.dueToday().length;
    todos.add({ title: "Do laundry", dueDate: today, completed: false });
    const todayItems = todos.dueToday();
    expect(todayItems.length).toBe(duetic + 1);
  });

  test("Should retrieve due later items", () => {
    const tomorrow = formattedDate(
      new Date(new Date().setDate(new Date().getDate() + 1))
    );
    const duelaterTodoItemsCount = todos.dueLater().length;
    todos.add({ title: "Return a book", dueDate: tomorrow, completed: false });
    expect(todos.dueLater().length).toBe(duelaterTodoItemsCount + 1);
  });
});