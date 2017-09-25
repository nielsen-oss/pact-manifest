'use strict'

const pact = require('@pact-foundation/pact-node')
const DEFAULT_PUBLISHED_TAG = 'develop'

module.exports = class ManifestPublisher {
  /**
   * @param {String} options.broker.pactBroker URL for Pact Broker
   * @param {String} options.broker.pactBrokerUsername Username for Pact Broker
   * @param {String} options.broker.pactBrokerPassword Password for Pact Broker
   * @param {String} options.consumerVersion consumer version to tag the pact contract
   * @param {String} options.pactFiles Array of files or directories containing pact contracts
   * @param {Array} options.tags list of tags
   */
  constructor (options = {}) {
    if (!options || !options.broker) {
      throw new Error('required: options.broker property to publish pacts')
    }

    if (!options.consumerVersion) {
      throw new Error('required: options.consumerVersion property')
    }

    this.pactFiles = options.pactFiles
    this.pactBroker = options.broker.pactBroker
    this.pactBrokerUsername = options.broker.pactBrokerUsername
    this.pactBrokerPassword = options.broker.pactBrokerPassword
    this.consumerVersion = options.consumerVersion
    this.tags = options.tags || [DEFAULT_PUBLISHED_TAG]
  }

  /**
   * Publishes a set of pact contracts to a Pact Broker
   *
   * @returns {Promise} array of pact contracts
   */
  publish () {
    const options = {
      pactUrls: this.pactFiles,
      pactBroker: this.pactBroker,
      pactBrokerUsername: this.pactBrokerUsername,
      pactBrokerPassword: this.pactBrokerPassword,
      consumerVersion: this.consumerVersion,
      tags: this.tags
    }

    return pact.publishPacts(options)
  }
}
