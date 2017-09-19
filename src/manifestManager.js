'use strict'

const path = require('path')
const fs = require('fs')
const glob = require('glob')

module.exports = class ManifestManager {
  constructor (options = {}) {
    this.basePath = options.basePath || process.cwd()
    this.manifestFile = options.manifestFile || '/tmp/pact_manifest.json'
    this.pactFilesPath = options.pactFilesPath || 'test/pacts/*.json'
    this.pactDefaultTag = options.pactDefaultTag || 'develop'
  }

  /**
   * creates a list of all pact contract files based on a glob matching pattern
   *
   * @returns {Promise} pactFiles resolves with array of pact contract files
   */
  async listPactFiles () {
    const pactFilesPath = path.join(this.basePath, this.pactFilesPath)
    const pactFiles = await this._getFilesByGlob(pactFilesPath)

    return pactFiles.map(filePath => path.relative(this.basePath, filePath))
  }

  /**
   * lists files based on a glob string pattern
   *
   * @param {String} pathGlob glob string pattern
   * @returns {Promise} array of files
   * @private
   */
  _getFilesByGlob (pathGlob = '') {
    return new Promise((resolve, reject) => {
      glob(pathGlob, {absolute: true}, (err, files) => {
        if (err) {
          return reject(err)
        }
        return resolve(files)
      })
    })
  }

  /**
   * reads a JSON file that represents the pact manifest
   *
   * @returns {Promise} resolves with manifest file object, or with boolean false if unable to access file
   * @private
   */
  _getPactManifestFile () {
    return new Promise((resolve, reject) => {
      fs.readFile(this.manifestFile, (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            return resolve(false)
          }
          return reject(err)
        }
        return resolve(JSON.parse(data))
      })
    })
  }

  createPactManifest (options = {}) {
    const pactFiles = options.pactFiles
    const pactManifest = options.pactManifest || {}

    return pactFiles.reduce((manifestObject, pactFile) => {
      if (!pactManifest.hasOwnProperty(pactFile)) {
        manifestObject[pactFile] = this.pactDefaultTag
      }

      return manifestObject
    }, pactManifest)
  }

  /**
   * writes a JSON file content that represents the pact manifest
   *
   * @param {Object} options.pactManifest an object to serialize
   * @returns {Promise} resolves with a boolean true if successful
   * @private
   */
  _writePactManifestFile (options = {}) {
    const pactManifest = options.pactManifest
    const pactManifestFilePath = this.manifestFile

    return new Promise((resolve, reject) => {
      fs.writeFile(String(pactManifestFilePath), this._objectToJSONString(pactManifest), (err) => {
        if (err) {
          return reject(err)
        }

        return resolve(true)
      })
    })
  }

  /**
   * Serializes an object to a string
   *
   * @param {Object} object
   * @private
   */
  _objectToJSONString (object) {
    return JSON.stringify(object, null, 2)
  }

  async createManifest () {
    let pactFiles = await this.listPactFiles()

    let pactManifestFile = await this._getPactManifestFile()
    let pactManifest = pactManifestFile || {}
    pactManifest = this.createPactManifest({pactManifest, pactFiles})

    return this._writePactManifestFile({pactManifest})
      .then(() => {
        return pactManifest
      })
  }
}
