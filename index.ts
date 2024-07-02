#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  name: string;
  constructor(stdname: string) {
    this.name = stdname;
  }
}

class Person {
  stdArray: Student[] = [];
  addStudent(std: Student) {
    this.stdArray.push(std);
  }
}

let personData = new Person();

async function start(data:Person) {
  console.log(chalk.magentaBright.bold("\nWELCOME\n"));

  await new Promise((resolve) => setTimeout(resolve, 2000));

  do {
    let interaction = await inquirer.prompt({
      name: "userInput",
      type: "list",
      message: chalk.yellow("Whom would you like to interact with?"),
      choices: ["staff", "students", "exit"],
    });

    if (interaction.userInput === "staff") {
      console.log(
        chalk.green(
          "Hello! You approach the staff room. Please feel free to ask any question.\n"
        )
      );
    } else if (interaction.userInput === "students") {
      let answer = await inquirer.prompt({
        name: "user",
        type: "input",
        message: chalk.yellow("Enter the name of student"),
      });

      let value = data.stdArray.find((i) => i.name.toLowerCase() === answer.user.toLowerCase());

      if (value) {
        console.log(
          "\nHello",
          chalk.italic.blueBright(`${answer.user}`),
          "! Welcome back to the class.\n"
        );

        console.log(chalk.magenta.underline("Existing Students:"));
        console.log(
          data.stdArray.map((i) => i.name),
          "\n"
        );
      } else {
        let newStudent = new Student(answer.user);
        data.addStudent(newStudent);
        console.log(chalk.red("\nNew Student Added!"));
        console.log(
          "Hello",
          chalk.italic.blueBright(`${answer.user}`),
          "! Welcome to the class.\n"
        );

        console.log(chalk.magenta.underline("Current Students:"));
        console.log(
          data.stdArray.map((i) => i.name),
          "\n"
        );
      }
    } else {
      console.log(
        chalk.red("Thank you for visiting! Looking forward for the next time.")
      );
      process.exit();
    }
  } while (true);
}

start(personData);
