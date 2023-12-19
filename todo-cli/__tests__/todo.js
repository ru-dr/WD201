/* eslint-disable no-undef */

const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueLater, dueToday, toDisplayableList } = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
let dateToday = new Date();
let today = formattedDate(new Date());
let yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
let tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

describe("Todolist Test Suit", () => {
  beforeAll(() => {
    add({ title: "Submit assignment", dueDate: yesterday, completed: false });
    add({ title: "Pay rent", dueDate: today, completed: true });
    add({ title: "Service Vehicle", dueDate: today, completed: false });
    add({ title: "File taxes", dueDate: tomorrow, completed: false });
    add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });
  });

  test("Add a new todo in list", () => {
    const todoItemCount = all.length;
    add({
      title: "New Todo",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemCount + 1);
  });

  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("retrieval of overdue items", () => {
    const todolist = overdue();
    expect(
      todolist.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("retrieval of due today items", () => {
    const todolist = dueToday();
    expect(
      todolist.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("retrieval of due later items", () => {
    const todolist = dueLater();
    expect(
      todolist.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });

  // Displayable list tests
  test("Displayable list for overdue items", () => {
    const overdues = overdue();
    const formattedOverdues = toDisplayableList(overdues);
    // Add your expectations for the formatted displayable list
    console.log("Formatted Overdue List:\n", formattedOverdues);
  });

  test("Displayable list for due today items", () => {
    const itemsDueToday = dueToday();
    const formattedItemsDueToday = toDisplayableList(itemsDueToday);
    // Add your expectations for the formatted displayable list
    console.log("Formatted Due Today List:\n", formattedItemsDueToday);
  });

  test("Displayable list for due later items", () => {
    const itemsDueLater = dueLater();
    const formattedItemsDueLater = toDisplayableList(itemsDueLater);
    // Add your expectations for the formatted displayable list
    console.log("Formatted Due Later List:\n", formattedItemsDueLater);
  });
});
