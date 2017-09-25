const ManifestPublisher = require('../../src/manifestPublisher')

test('constructor initializes successfully', () => {
  const options = {
    pactFiles: [
      'file1', 'file2'
    ],
    broker: {
      pactBroker: 'someUrl',
      pactBrokerUsername: 'someUsername',
      pactBrokerPassword: 'somePassword'
    },
    consumerVersion: '1.2.3',
    tags: ['develop']
  }

  const myManifestPublisher = new ManifestPublisher(options)
  expect(myManifestPublisher.pactFiles).toBe(options.pactFiles)
  expect(myManifestPublisher.pactBroker).toBe(options.broker.pactBroker)
  expect(myManifestPublisher.pactBrokerUsername).toBe(options.broker.pactBrokerUsername)
  expect(myManifestPublisher.pactBrokerPassword).toBe(options.broker.pactBrokerPassword)
  expect(myManifestPublisher.consumerVersion).toBe(options.consumerVersion)
  expect(myManifestPublisher.tags).toBe(options.tags)
})

test('constructor throws error on missing broker object', () => {
  const options = {
    pactFiles: [
      'file1', 'file2'
    ],
    consumerVersion: '1.2.3',
    tags: ['develop']
  }

  expect(() => new ManifestPublisher(options)).toThrowError(/broker/)
})

test('constructor throws error on missing option consumerVersion', () => {
  const options = {
    pactFiles: [
      'file1', 'file2'
    ],
    broker: {
      pactBroker: 'someUrl',
      pactBrokerUsername: 'someUsername',
      pactBrokerPassword: 'somePassword'
    },
    tags: ['develop']
  }

  expect(() => new ManifestPublisher(options)).toThrowError(/consumerVersion/)
})

test('constructor resolves to a default "develop" tag when unspecified', () => {
  const options = {
    pactFiles: [
      'file1', 'file2'
    ],
    broker: {
      pactBroker: 'someUrl',
      pactBrokerUsername: 'someUsername',
      pactBrokerPassword: 'somePassword'
    },
    consumerVersion: '1.2.3'
  }

  expect(() => new ManifestPublisher(options)).not.toThrowError(/consumerVersion/)
  const myManifestPublisher = new ManifestPublisher(options)
  expect(myManifestPublisher.tags).toEqual(['develop'])
})
