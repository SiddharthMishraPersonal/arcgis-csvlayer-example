/**
 * Copyright © 2018 Siddharth Mishra
 */

/* global require, module, __dirname */
/* jslint node: true */
/* jslint node: true */
'use strict';

let redis;
const logger = require('../logger');
const bluebird = require('bluebird');

/**
 * Redis client to use Redis server as memcache.
 */
class RedisCacheWrapper {
  /**
   * Constructor to initialize the class.
   * @param {object} opts : Redis Client options.
   */
  constructor(opts) {
    if (opts.host === 'mock') {
      redis = require('redis-mock');
    } else {
      redis = require('redis');
    }
    bluebird.promisifyAll(redis.RedisClient.prototype);
    this.cache = redis.createClient(opts);
    this.cache.on('error', (err) => {
      logger.error(err);
    });
    this.ttl = opts.ttl;
  }

  /**
   * To get the cached value.
   * @param {string} name : The key to be searched in the Cache.
   * @return {object} : Returns value associated with the Key.
   */
  async get(name) {
    let response = await this.cache.getAsync(name);
    if (response === null) {
      return undefined;
    };
    return JSON.parse(response);
  }

  /**
   * To cache the value.
   * @param {string} name : The key of cached value.
   * @param {object} value : The object to be saved against the Key.
   * @return {boolean} : Returns true on Success.
   */
  async set (name, value) {
    let response = await this.cache.setAsync(name, JSON.stringify(value));
    if (response === 'OK') {
        return true;
    }
  }

  /**
   * To remove cached value.
   * @param {array} names : List of keys to be deleted.
   * @return {number} : Returns number of deleted entries.
   */
  async remove(names) {
    let response = await this.cache.delAsync(names);
    return response;
  }
}

/**
 * Exports RedisCache class
 */
module.exports = RedisCacheWrapper;
