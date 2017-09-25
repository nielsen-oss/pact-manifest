const ManifestManager = require('../../src/ManifestManager')
const fs = require('fs')

jest.mock('fs', () => ({
  readFile: jest.fn((file, cb) => { return cb(null, '{"foo": "bar"}') })
}))

test('successfully reads the manifest file content', async () => {
  const options = {
    basePath: '/home/user1',
    manifestFile: '/tmp/myFile',
    pactFilesPath: 'test/pacts/*.js',
    pactDefaultTag: 'testTag'
  }

  fs.readFile.mockImplementation((file, cb) => { return cb(null, '{"foo": "bar"}') })

  const myManifestManager = new ManifestManager(options)
  let manifest = await myManifestManager._getPactManifestFile()
  expect(manifest).toEqual({'foo': 'bar'})
})

test('returns false when file is not found', async () => {
  const options = {
    basePath: '/home/user1',
    manifestFile: '/tmp/myFile',
    pactFilesPath: 'test/pacts/*.js',
    pactDefaultTag: 'testTag'
  }

  fs.readFile.mockImplementation((file, cb) => {
    const err = {code: 'ENOENT'}
    return cb(err, null)
  })

  const myManifestManager = new ManifestManager(options)
  let manifest = await myManifestManager._getPactManifestFile()
  expect(manifest).toEqual(false)
})
