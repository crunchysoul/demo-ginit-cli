const files = require('./files.js');
const inquirer = require('inquirer');

module.exports = {
  askGithubCredentials: () => {
    const question = [
      {
        type: 'input',
        name: 'username',
        message: 'Enter your Github username or email address',
        validate: (value) => {
          if (value.length) {
            return true;
          }
          return 'Please enter your username or email address';
        },
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password',
        valiate: (value) => {
          if (value.length) {
            return true;
          }
          return 'Please enter your password';
        },
      },
    ];

    return inquirer.prompt(question);
  },

  askRepoDetails: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: (value) => {
          if (value.length) {
            return true;
          }
          return 'Please enter a name for the repository';
        },
      },
      {
        type: 'input',
        name: 'description',
        defulat: argv._[1] || null,
        message: 'Optionally enter a description of the repository:',
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or private',
        choices: ['public', 'private'],
        default: 'public',
      },
    ];

    return inquirer.prompt(questions);
  },

  askIgnoreFiles: (filelist) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'ignore',
        message: 'Select the files and/or folders you wish to ignore',
        choices: filelist,
        default: ['node_mouldes', 'bower_components'],
      },
    ];

    return inquirer.prompt(questions);
  },
};
