/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { startDevServer } from '@cypress/webpack-dev-server';
// import BabelConfig from '../../babel.config';
// import webpackConfig from '@vue/cli-service/webpack.config.js';

module.exports = (on, config) => {
  on('dev-server:start', (options) => startDevServer({
    options,
    // BabelConfig,
    // webpackConfig,
  }));

  return config;
};
