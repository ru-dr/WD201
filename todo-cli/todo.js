const todoList = () => {
  all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };

  const overdue = () => {
    const today = new Date();
    const overdueItems = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate < formattedDate(today)) {
        overdueItems.push(all[i]);
      }
    }

    return overdueItems;
  };

  const dueToday = () => {
    const today = new Date();
    const dueTodayItems = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate == formattedDate(today)) {
        dueTodayItems.push(all[i]);
      }
    }

    return dueTodayItems;
  };

  const dueLater = () => {
    const today = new Date();
    const dueLaterItems = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate > formattedDate(today)) {
        dueLaterItems.push(all[i]);
      }
    }

    return dueLaterItems;
  };

  const toDisplayableList = (list) => {
    let displayableList = "";
    const today = formattedDate(new Date());

    for (let i = 0; i < list.length; i++) {
      const taskStatus = list[i].completed ? "[x]" : "[ ]";
      const dueDate = formattedDate(new Date(list[i].dueDate));
      const duePart = dueDate !== today ? ` ${dueDate}` : "";

      displayableList += `${taskStatus} ${list[i].title}${duePart}`;

      // Add a newline character between items, but not after the last item
      if (i < list.length - 1) {
        displayableList += "\n";
      }
    }

    return displayableList;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

// const todos = todoList();

// const formattedDate = (d) => {
//   return d.toISOString().split("T")[0];
// };

// var dateToday = new Date();
// const today = formattedDate(dateToday);
// const yesterday = formattedDate(
//   new Date(new Date().setDate(dateToday.getDate() - 1))
// );
// const tomorrow = formattedDate(
//   new Date(new Date().setDate(dateToday.getDate() + 1))
// );

// todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
// todos.add({ title: "Pay rent", dueDate: today, completed: true });
// todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
// todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
// todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

// console.log("My Todo-list\n");

// console.log("Overdue");
// var overdues = todos.overdue();
// var formattedOverdues = todos.toDisplayableList(overdues);
// console.log(formattedOverdues);
// console.log("\n");

// console.log("Due Today");
// let itemsDueToday = todos.dueToday();
// let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
// console.log(formattedItemsDueToday);
// console.log("\n");

// console.log("Due Later");
// let itemsDueLater = todos.dueLater();
// let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
// console.log(formattedItemsDueLater);
// console.log("\n\n");

module.exports = todoList;