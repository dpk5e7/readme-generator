const arrLicenses = [
  {
    name: "Apache License 2.0",
    website: "https://www.apache.org/licenses/LICENSE-2.0",
    badge: "https://img.shields.io/badge/License-Apache_2.0-blue.svg",
  },
  {
    name: "Boost Software License 1.0",
    website: "https://www.boost.org/LICENSE_1_0.txt",
    badge: "https://img.shields.io/badge/License-Boost_1.0-lightblue.svg",
  },
  {
    name: "GNU GPLv3",
    website: "https://www.gnu.org/licenses/gpl-3.0-standalone.html",
    badge: "https://img.shields.io/badge/License-GPLv3-blue.svg",
  },
  {
    name: "MIT License",
    website: "https://opensource.org/licenses/MIT",
    badge: "https://img.shields.io/badge/License-MIT-yellow.svg",
  },
  {
    name: "Mozilla Public License 2.0",
    website: "https://www.mozilla.org/en-US/MPL/2.0/",
    badge: "https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg",
  },
  {
    name: "The Unlicense",
    website: "https://unlicense.org/",
    badge: "https://img.shields.io/badge/license-Unlicense-blue.svg",
  },
];

/**
 * Function that returns a license badge based on which license is passed in
 * If there is no license, returns an empty string
 * @param {string} license
 * @returns The License Badge
 */
function renderLicenseBadge(license) {
  let licenseBadge = "";
  if (license.trim().toLowerCase() !== "none") {
    // get license object
    const objLicense = arrLicenses.find(
      (element) =>
        element.name.trim().toLowerCase() === license.trim().toLowerCase()
    );
    licenseBadge = `[![License:](${objLicense.badge})](${objLicense.website})\n\n`;
  }
  return licenseBadge;
}

/**
 * Function that returns the license link.
 * If there is no license, returns an empty string
 * @param {string} license
 * @returns A License Link
 */
function renderLicenseLink(license) {
  let licenseLink = "";
  if (license.trim().toLowerCase() !== "none") {
    // get license object
    const objLicense = arrLicenses.find(
      (element) =>
        element.name.trim().toLowerCase() === license.trim().toLowerCase()
    );
    licenseLink = `[${objLicense.name}](${objLicense.website})`;
  }
  return licenseLink;
}

/**
 * Function that returns the license section of README
 * If there is no license, returns an empty string
 * @param {string} license
 * @returns The markdown for the License section
 */
function renderLicenseSection(license) {
  let licenseSection = "";
  if (license.trim().toLowerCase() !== "none") {
    licenseSection = `\n\n## License

${renderLicenseBadge(
  license
)}This application is covered under the ${renderLicenseLink(license)}.`;
  }
  return licenseSection;
}

/**
 * Function that returns the license Table of Contents entry of README
 * If there is no license, returns an empty string
 * @param {string} license
 * @returns The markdown for the License Table of Contents entry
 */
function renderLicenseTOC(license) {
  let licenseSection = "";
  if (license.trim().toLowerCase() !== "none") {
    licenseSection = `\n- [License](#license)`;
  }
  return licenseSection;
}

// TODO: Create a function to generate markdown for README
/**
 * Function to generate markdown for README
 * @param {inquirer response} data
 * @returns The markdown for the README
 */
function generateMarkdown(data) {
  return `# ${data.title}    
${renderLicenseBadge(data.license)}## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)${renderLicenseTOC(data.license)}
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}${renderLicenseSection(data.license)}

## Contributing

${data.contributing}

## Tests

${data.tests}

## Questions

GitHub Link: [https://github.com/${data.github}](https://github.com/${
    data.github
  })

Please contact me at ${data.email} with any additional questions you may have.
`;
}

module.exports = generateMarkdown;
