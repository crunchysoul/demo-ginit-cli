const _ = require('lodash');
const chalk = require('chalk');
const CLI = require('clui');
const Configstore = require('configstore');
const octokit = require('@octokit/rest')();

const inquirer = require('./inquirer.js');
const pkg = require('../package.json');

const { Spinner } = CLI;
const conf = new Configstore(pkg.name);

module.exports = {
  getInstance: () => octokit,

  getStoreGithubToken: () => conf.get('github.token'),

  setGithubCredentials: async () => {
    const credentials = await inquirer.askGithubCredentials();
    octokit.authenticate(_.extend(
      {
        type: 'basic',
      },
      credentials,
    ));
  },

  registerNewToken: async () => {
    const status = new Spinner('Authenticating you, please wait...');
    status.start();

    try {
      const response = await octokit.authorization.create({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'ginits, the command-line tool for initializing Git repos',
      });
      const { token } = response.data;
      if (token) {
        conf.set('github.token', token);
        return token;
      }

      throw new Error('Missing Token', 'Github token was not found in the response');
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  },

  githubAuth: (token) => {
    octokit.authenticate({
      type: 'oauth',
      token,
    });
  },

  getStoreGithubToken: () => conf.get('github.token'),
};
