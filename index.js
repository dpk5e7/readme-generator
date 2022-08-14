const generateMarkdown = require("./utils/generateMarkdown.js");
const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
  {
    type: "input",
    message: "Please specify a project title:",
    name: "title",
  },
  {
    type: "editor",
    message: "Please describe your project:",
    name: "description",
  },
  {
    type: "editor",
    message: "Please provide installation instructions:",
    name: "installation",
  },
  {
    type: "editor",
    message: "Please provide usage information:",
    name: "usage",
  },
  {
    type: "editor",
    message: "Please provide contribution guidelines:",
    name: "contributing",
  },
  {
    type: "editor",
    message: "Please provide test instructions:",
    name: "tests",
  },
  {
    type: "list",
    message: "Please select a license:",
    choices: [
      "Apache License 2.0",
      "Boost Software License 1.0",
      "GNU GPLv3",
      "MIT License",
      "Mozilla Public License 2.0",
      "The Unlicense",
      "None",
    ],
    name: "license",
  },
  {
    type: "input",
    message: "Please provide your GitHub username:",
    name: "github",
  },
  {
    type: "input",
    message: "Please provide your email address:",
    name: "email",
    validate: function (email) {
      //gist.github.com/Amitabh-K/ae073eea3d5207efaddffde19b1618e8
      https: valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email
      );

      if (valid) {
        return true;
      } else {
        console.log(".  Please enter a valid email.");
        return false;
      }
    },
  },
];

/**
 * Function to write the markdown data to the delivered fileName.
 * @param {string} fileName
 * @param {inquirer response} data
 */
function writeToFile(fileName, data) {
  // Call generateMarkdown which returns a string
  const markdown = generateMarkdown(data);

  // write that string to a file
  fs.writeFile(fileName, markdown, (err) =>
    err
      ? console.error(err)
      : console.log(`Success!  Open ${fileName} to see your results.`)
  );
}

/**
 * Function to return the next available filename with a base of "README".
 * This function protects from overwriting files that already exist, specifically the README for this program.
 * @returns {string} The next available filename
 */
function getNextFileName() {
  let base = "README";
  let fileName = base;
  let i = 1;
  while (fs.existsSync(`./${fileName}.md`)) {
    fileName = base + i++;
  }
  return `./${fileName}.md`;
}

/**
 * Function to initialize app
 */
function init() {
  // This is where to do all the inquirer stuff and store it into data
  inquirer.prompt(questions).then((response) => {
    // Create a unique filename
    // then call writeToFile
    writeToFile(getNextFileName(), response);
  });
}

// Function call to initialize app
init();
