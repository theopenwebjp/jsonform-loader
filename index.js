/*
Loads dependencies based on desired group of function.
*/

/**
 * @typedef {(string)|(string[])} Dependency
 * @typedef {Record<string, Dependency>} DependencyMap { packageName1: filePath, packageName2: [filePath1, filePathn, ... ] }
 */

const DEFAULTS = ['css', 'jquery', 'underscore']
const { loadDependencyUrls } = require('js-functions').Utility

/**
 * @type {DependencyMap}
 */
const dependencies = require('./mapping.json')

let depsUrl = './lib/jsonform/deps/'
let jsonFormUrl = './lib/jsonform.js'

/**
 * @param {string[]} keys
 */
function load (keys = []) {
  const requiredUrls = createDependencyList(DEFAULTS)
  return loadDependencies(requiredUrls)
    .then(() => {
      // console.log(window.$, window._)
      const optionalUrls = createDependencyList(keys, DEFAULTS)
      return loadDependencies(optionalUrls)
    })
    .then(() => {
      return loadDependencies([jsonFormUrl])
    })
}

function getKeys () {
  return Object.keys(dependencies)
}

/**
 * @param {{ depsUrl?: string, jsonFormUrl?: string }} options
 */
function setOptions (options = {}) {
  if (options.depsUrl) {
    depsUrl = options.depsUrl
  }
  if (options.jsonFormUrl) {
    jsonFormUrl = options.jsonFormUrl
  }
  return {
    depsUrl,
    jsonFormUrl
  }
}

/**
 * @param {string[]} rawKeys
 * @param {string[]} disallowed
 */
function createDependencyList (rawKeys = [], disallowed = []) {
  // Remove disallowed
  /**
   * @type {string[]}
   */
  const keys = []
  rawKeys.forEach((key, index) => {
    if (disallowed.indexOf(key) < 0) {
      keys.push(key)
    }
  })
  console.log('createDependencyList', rawKeys, keys, disallowed)

  /**
   * @type {string[]}
   */
  let usedDependencies = []
  keys.forEach((key) => {
    let val = dependencies[key]
    if (!val) {
      console.warn('Following key is not a valid dependency', key)
      return
    }

    const thisDependencies = Array.isArray(val) ? val : [val]
    usedDependencies = usedDependencies.concat(usedDependencies, thisDependencies)
  })

  // Make sure is unique
  usedDependencies = uniqueArray(usedDependencies)

  // Add dependencies directory prefix
  usedDependencies = usedDependencies.map(url => {
    return `${depsUrl}${url}`
  })

  return usedDependencies
}

/**
 * Loads dependencies(css and js) in order.
 * @param {string[]} urls
 */
function loadDependencies (urls = []) {
  return loadDependencyUrls(urls, {ordered: true})
}

/**
 * @param {any[]} arr
 */
function uniqueArray (arr) {
  return [...new window.Set(arr)]
}

const loader = {
  load: load,
  getKeys: getKeys,
  setOptions: setOptions
}

if (typeof module === 'object') {
  module.exports = loader
}
if (typeof window === 'object') {
  const w = /** @type {Window & { JsonFormLoader?: typeof loader }}  */ (window)
  w.JsonFormLoader = loader
}
