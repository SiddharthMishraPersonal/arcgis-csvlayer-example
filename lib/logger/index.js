/**
 * Copyright © 2018 Siddharth Mishra
 */

/* global require, module, __dirname */
/* jslint node: true */
/* jslint node: true */
'use strict';

const bunyan = require('bunyan');
const config = require('../../config');

/**
 * Create a default logger to use throughout the application.
 */
const logger = bunyan.createLogger({
  name: 'cr-api',
  streams: [{
    level: config.logLevel,
    stream: process.stdout,
  }],
  serializers: bunyan.stdSerializers,
});
logger.level(bunyan[config.logLevel]);

module.exports = logger;
