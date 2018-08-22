/*
 * Copyright © 2018
 */

/* global require, module, __dirname */
/* jslint node: true */
'use strict';
const Cache = require('../lib/cache').getInstance();
const fs = require('fs');
const path = require('path');

/**
 * Swagger Controller
 */
class Incidents {
  /**
   * Constructor to initialize the class Incidents.
   * @param {Object} locals : app.locals; context specific parameters
   * @param {Object} locals.logger : logging object
   * @param {Object} locals.metrics : metrics object
   */
  constructor(locals) {
    this.logger = locals.logger;
    this.config = locals.config;
  }

  /**
   * Executes Incident Query
   * @param {object} req : the Express request object.
   * @param {object} res : The Express response object.
   * @param {object} next : The Express call back function.
   */
  async getIncidents(req, res, next) {
    try {
      // Convert JSON to CSV.
      const csvData = await this.getIncidentsInCsvFormat();

      res.send(csvData);
      next();
    } catch (error) {
      const msg =
        'Error occurred while getting CSV Data.';
      this.logger.error(msg, error);

      next(error);
    }

  }

  /**
   * Gives CSV Data.
   */
  async getIncidentsInCsvFormat() {
    // get data from Cache and send it as csv.
    let csvData = await Cache.get('test');

    // if Cache doesn't have it.
    if (!csvData) {
      this.logger.info('Cannot find in cache.');
      csvData = fs.readFileSync(path.join(__dirname, '..', 'data', 'data.csv'), 'utf8');
      Cache.set('test', csvData);
    } else {
      this.logger.info('Got data in Cache.');
    }
    return Promise.resolve(csvData);
  }

}

module.exports = Incidents;