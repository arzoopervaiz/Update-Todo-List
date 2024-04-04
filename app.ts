import inquirer from "inquirer";
import chalk from "chalk";
let todos: string[] = []; // Array to store todo tasks
async function todoQuestion(todos: string[] = []) {
  console.log(chalk.bold.bgBlue.italic("\n\tWelcome to Your Todo List\t\n"));
  do {
    console.log(""); //for spacing
    let todosOption = await inquirer.prompt({
      // Prompt user to enter task
      name: "option",
      type: "list",
      message: "Select an option:",
      choices: ["Add", "View", "Update", "delete", "Exist"],
    });
    if (todosOption.option === "Add") {
      // add task
      let add = await inquirer.prompt({
        name: "addItems",
        type: "input",
        message: "Enter the task to add: ",
      });
      todos.push(add.addItems); // Add task to array
      // console.log(todos);
      console.log(chalk.green.bold.italic("Task add successfully"));
      // Display current tasks
      todos.forEach((task, index) => {
        console.log(chalk.cyan(`${index + 1}. ${task}`));
      });
    }
    // View tasks
    if (todosOption.option === "View") {
      console.log(chalk.bold.italic.green("Current Task:"));
      todos.forEach((task, index) => {
        console.log(chalk.cyan(`${index + 1}. ${task}`));
      });
      // console.log(todos);
    }
    // Update task
    if (todosOption.option === "Update") {
      let update = await inquirer.prompt([
        {
          name: "updateItem",
          type: "list",
          message: "Select the task to update:",
          choices: todos,
        },
        {
          name: "updateItem2",
          type: "input",
          message: "Enter the updated task:",
        },
      ]);
      let newtodos = todos.filter((item) => item !== update.updateItem);
      todos = [...newtodos, update.updateItem2];
      console.log(chalk.green.bold.italic("Task updated successfully."));
    }
    // Delete task
    if (todosOption.option === "delete") {
      let remove = await inquirer.prompt({
        name: "removeItems",
        type: "list",
        message: "Select the task to delete:",
        choices: todos,
      });
      todos = todos.filter((item) => item !== remove.removeItems);
      console.log(chalk.red.bold.italic("Task deleted successfully."));
    }
    // Exit application
    if (todosOption.option === "Exist") {
      break;
    }
  } while (true);
}
//call function
todoQuestion(todos);