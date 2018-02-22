#! /usr/bin/env node

const chalk = require('chalk');

const figlet = require('./lib/figlet.js');
const files = require('./lib/files.js');
const github = require('./lib/github.js');
const inquirer = require('./lib/inquirer.js');
const repo = require('./lib/repo.js');

const getGithubToken = async () => {
  let token = github.getStoreGithubToken();
  if (token) {
    return token;
  }
  await github.setGithubCredentials();

  const accessToken = await github.hasAccessToken();
  if (accessToken) {
    console.log(chalk.yellow('An existing access token has been found!'));

    // ask user to regenerate a new token
    token = await github.regenerateNewToken(accessToken.id);
    return token;
  }

  token = await github.registerNewToken();
  return token;
};

const run = async () => {
  try {
    const token = await getGithubToken();
    github.githubAuth(token);
    const url = await repo.createRemoteRepo();
    await repo.createGitignore();
    const done = await repo.setupRepo(url);
    if (done) {
      console.log(chalk.green('All done!'));
    }
  } catch (err) {
    if (err) {
      console.log(chalk.red(err));
    }
  }
};

figlet.showBanner();
figlet.isGit();
run();
