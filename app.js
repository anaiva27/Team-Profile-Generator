// require dependencies and routes to the files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "Team.html");

// arrays of all questions and empty array to push the answers into
let employee = [];

const managerQuestions = [
    {
        type: "input",
        message: "What is your name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your ID?",
        name: "id",
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email",
    },
    {
        type: "input",
        message: "What is office number?",
        name: "officeNumber",
    }
]

const engineerQuestions = [
    {
        type: "input",
        message: "What is your name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your ID?",
        name: "id",
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email",
    },
    {
        type: "input",
        message: "What is GitHub name?",
        name: "github",
    }
]

const internQuestions = [
    {
        type: "input",
        message: "What is your name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your ID?",
        name: "id",
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email",
    },
    {
        type: "input",
        message: "What is the name of your school?",
        name: "school",
    }
]

const employeeQuestion = [
    {
        type: "list",
        message: `Would you like to add another employee?`,
        name: "newEmpoyee",
        choices: [
            "engineer",
            "intern",
            "no, finish adding"]
    }
]

// functions to prompt the manager to add his own info and then initiate the prompts for the employees
function askManager() {
    inquirer.prompt(managerQuestions)
        .then((response) => {
            let managerCard = new Manager(response.name, response.id, response.email, response.officeNumber)
            employee.push(managerCard)
            newEmployee()
        })
}

function newEmployee() {
    inquirer.prompt(employeeQuestion)
        .then((response) => {
            switch (response.newEmpoyee) {
                case "engineer":
                    addEngineer()
                    break
                case "intern":
                    addIntern()
                    break
                case "no, finish adding":
                    // render html
                    fs.writeFile(outputPath, render(employee), (err) =>
                        err ? console.error(err) : console.log("Team summary has been generated")
                    )
                    break
            }
        })
}

// prompts for engineer
function addEngineer() {
    inquirer.prompt(engineerQuestions)
        .then((response) => {
            const engineer = new Engineer(
                response.name,
                response.id,
                response.email,
                response.github
            )
            employee.push(engineer)
            newEmployee()
        })
        
}

// prompts for intern
function addIntern() {
    inquirer.prompt(internQuestions)
        .then((response) => {
            const intern = new Intern(
                response.name,
                response.id,
                response.email,
                response.school
            )
            employee.push(intern)
            newEmployee()
        })
}

// invoke the manager function to initiate the app
askManager()