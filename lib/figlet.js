const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./files.js');

module.exports = {
  showBanner: () => {
    clear();
    console.log(chalk.yellow(figlet.textSync('Ginit', { horizontalLayout: 'full' })));
  },

  isGit: () => {
    if (files.directoryExists('.git')) {
      console.log(chalk.red('Already a git repository!'));
      process.exit();
    }
  },
};
