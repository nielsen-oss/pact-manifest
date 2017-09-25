const ManifestPublisher = require('../../src/manifestPublisher')
jest.mock('@pact-foundation/pact-node', () => ({
  publishPacts: jest.fn(() => { return Promise.resolve({a: 'b'}) })
}))

test('successfully reads the manifest file content', async () => {
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
  await expect(myManifestPublisher.publish()).resolves.toEqual({a: 'b'})
})
