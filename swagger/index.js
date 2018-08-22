/**
 * Copyright © 2018 Siddharth Mishra
 */

'use strict';

const swaggerParser = require('swagger-parser');
const Path = require('path');

/**
 * Parses through all Swagger related YAML files and converts into JSON file.
 * @return {Promise}: Returns promise.
 */
function convertYamlToJson() {
  return new Promise(function (resolve, reject) {
    const swaggerApiFile = `swagger.${process.env.NODE_ENV || 'local' }.yaml`;
    const path = Path.join(__dirname, swaggerApiFile);
    swaggerParser.validate(path, (err, api) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(api);
      }
    });
  });
}

module.exports.convertYamlToJson = convertYamlToJson;
