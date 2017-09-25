const ManifestManager = require('../../src/ManifestManager')

test('constructor initializes successfully', () => {
  const options = {
    basePath: '/home/user1',
    manifestFile: '/tmp/myFile',
    pactFilesPath: 'test/pacts/*.js',
    pactDefaultTag: 'testTag'
  }
  const myManifestManager = new ManifestManager(options)
  expect(myManifestManager.basePath).toBe(options.basePath)
  expect(myManifestManager.manifestFile).toBe(options.manifestFile)
  expect(myManifestManager.pactFilesPath).toBe(options.pactFilesPath)
  expect(myManifestManager.pactDefaultTag).toBe(options.pactDefaultTag)
})

test('constructor throws error on missing option pactFilesPath', () => {
  const options = {
    basePath: '/home/user1',
    manifestFile: '/tmp/myFile',

    pactDefaultTag: 'testTag'
  }

  expect(() => new ManifestManager(options)).toThrowError(/pactFilesPath/)
})

test('constructor throws error on missing option manifestFile', () => {
  const options = {
    basePath: '/home/user1',
    pactDefaultTag: 'testTag'
  }

  expect(() => new ManifestManager(options)).toThrowError(/manifestFile/)
})
