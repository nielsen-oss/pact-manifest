const ManifestManager = require('../../src/ManifestManager')

test('successfully get the pacts grouped by tag', async () => {
  const basePath = '/home/user1'
  const pactManifest = {
    'nbi-pact.json': 'develop',
    'nbi-pact2.json': 'alpha'
  }
  let manifestsByTag = ManifestManager.getManifestsByTag(basePath, pactManifest)
  expect(Object.keys(manifestsByTag).length).toEqual(2)
  expect(manifestsByTag.hasOwnProperty('develop')).toBeTruthy()
  expect(manifestsByTag.hasOwnProperty('alpha')).toBeTruthy()
})

test('more than one pact with the same tag', async () => {
  const basePath = '/home/user1'
  const pactManifest = {
    'nbi-pact.json': 'develop',
    'nbi-pact3.json': 'develop',
    'nbi-pact2.json': 'alpha'
  }
  let manifestsByTag = ManifestManager.getManifestsByTag(basePath, pactManifest)
  expect(Object.keys(manifestsByTag).length).toEqual(2)
  expect(manifestsByTag.hasOwnProperty('develop')).toBeTruthy()
  expect(manifestsByTag['develop'].length).toEqual(2)
})

test('successfully filter the pacts by a specific tag', async () => {
  const basePath = '/home/user1'
  const pactManifest = {
    'nbi-pact.json': 'develop',
    'nbi-pact2.json': 'alpha'
  }
  const tag = 'alpha'
  let manifestsByTag = ManifestManager.getManifestsByTag(basePath, pactManifest, tag)
  expect(Object.keys(manifestsByTag).length).toEqual(1)
  expect(manifestsByTag.hasOwnProperty(tag)).toBeTruthy()
})

test('return empty object when parameter pactManifest is not passed', async () => {
  const basePath = '/home/user1'
  let manifestsByTag = ManifestManager.getManifestsByTag(basePath)
  expect(manifestsByTag).toEqual({})
})

test('pact path is like in manifest when basePath is undefined ', async () => {
  const pactManifest = {
    'nbi-pact.json': 'develop',
  }
  let manifestsByTag = ManifestManager.getManifestsByTag(undefined, pactManifest)
  expect(Object.keys(manifestsByTag).length).toEqual(1)
  expect(manifestsByTag.hasOwnProperty('develop')).toBeTruthy()
  expect(manifestsByTag['develop'][0]).toEqual('nbi-pact.json')
})
