/**
 * Copyright © 2018 Siddharth Mishra
 */

/* global require, module, __dirname */
/* jslint node: true */
/* jslint node: true */
'use strict';

const nConf = require('nconf');

nConf
  .argv()
  .env()
  .file({
    file: __dirname + '/config.json',
  });

nConf.set('name', 'ArcGIS Heatmap Example');

let configObject = {
  get host() {
    return nConf.get('host');
  },
  set host(val) {
    return nConf.set('host', val);
  },
  get port() {
    return nConf.get('port');
  },
  set port(val) {
    return nConf.set('port', val);
  },
  get logLevel() {
    return nConf.get('logLevel');
  },
  get maxRequestSize() {
    return nConf.get('maxRequestSize');
  },
  get cache() {
    return nConf.get('cache');
  },
};

module.exports = configObject;