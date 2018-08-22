/**
 * Copyright © 2018 Siddharth Mishra
 */

/* global require, module, __dirname */
/* jslint node: true */
/* jslint node: true */
'use strict';

const RedisWrapper = require('./redisWrapper');
const NodeCacheWrapper = require('./nodeCacheWrapper');
const config = require('../../config');
const logger = require('../logger');

/**
 * Singleton Cache class; wraps different caching mechanisms which must provide
 * a common interface (undefined for cache miss, not null, for example)
 */
class Cache {
  /**
   * Allows instances to be recognized as Cache objects
   */
  get [Symbol.toStringTag]() {
    return 'Cache';
  }

  /**
   * Constructor to initialize the class Cache.
   * @param {number} cacheConfig : configuration object for cache.
   */
  constructor(cacheConfig) {
    if (cacheConfig.isLocal) {
      this.cache = new NodeCacheWrapper(cacheConfig);
    } else {
      this.cache = new RedisWrapper(cacheConfig);
    }
  }

  /**
   * Passes request to underlying caching library.
   * @param {string} name : The key to be searched in the Cache.
   * @return {object} : Returns value associated with the Key.
   */
  async get(name) {
    return this.handle(() => {
      return this.cache.get(name);
    });
  }

  /**
   * Passes request to underlying caching library.
   * @param {string} name : The key of cached value.
   * @param {object} value : The object to be saved against the Key.
   * @return {boolean} : Returns true on Success.
   */
  async set(name, value) {
    return this.handle(() => {
      return this.cache.set(name, value);
    });
  }

  /**
   * Passes request to underlying caching library.
   * @param {array} names : List of keys to be deleted.
   * @return {number} : Returns number of deleted entries.
   */
  async remove(names) {
    return this.handle(() => {
      return this.cache.remove(names);
    });
  }

  /**
   * Singleton get object method
   * @return {Cache} cache : the cacheing object
   */
  static getInstance() {
    if (!this.cache) {
      this.cache = new Cache(config.cache);
    }
    return this.cache;
  };

  /**
   * Generic function to handle async implementation.
   * @param {function} f : Function.
   * @return {Promise.<*>} : Returns Promise.
   */
  async handle(f) {
    try {
      return await f();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

/**
 * Exports cache.
 */
module.exports = Cache;
