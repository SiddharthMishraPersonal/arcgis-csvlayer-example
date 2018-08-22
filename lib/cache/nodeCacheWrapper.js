/**
 * Copyright © 2018 Siddharth Mishra
 */

/* global require, module, __dirname */
/* jslint node: true */
/* jslint node: true */
'use strict';

const NodeCache = require('node-cache');

/**
 *  Wraps the node-cache library for local caching.
 */
class NodeCacheWrapper {
  /**
   * Constructor to initialize the class Cache.
   * @param {number} ttl : Time To Live constant.
   */
  constructor(ttl) {
    this.cache = new NodeCache({
      stdTTL: ttl,
    });
  }

  /**
   * To get the cached value.
   * @param {string} name : The key to be searched in the Cache.
   * @return {object} : Returns value associated with the Key.
   */
  get(name) {
    return this.cache.get(name);
  }

  /**
   * To cache the value.
   * @param {string} name : The key of cached value.
   * @param {object} value : The object to be saved against the Key.
   * @return {boolean} : Returns true on Success.
   */
  set(name, value) {
    return this.cache.set(name, value);
  }

  /**
   * To remove cached value.
   * @param {array} names : List of keys to be deleted.
   * @return {number} : Returns number of deleted entries.
   */
  remove(names) {
    return this.cache.del(names);
  }
}

/**
 * Exports cache.
 */
module.exports = NodeCacheWrapper;
