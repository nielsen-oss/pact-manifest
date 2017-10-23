# Pact Manifest

Pact Manifest is a Node.js library to publish pact contracts to a broker using a manifest.

## Context

Pact is a collection of frameworks that implement the 
Consumer-Driven Contracts pattern to enable lean testing of API contracts between consumers and providers. 

## Why

When working in a CI/CD-enabled workflow, the consumer and provider are 
deploying their artifacts quite often and any dependency on providers's 
API that isn't ready is hidden behind feature flags, api versioning or 
other means. This ensures that the consumer can deploy his version without 
waiting with a long-lived branch for the entire API contract to be 
implemented by its provider.

## How

The library collects the pact contract files and creates or updates a 
manifest file with the path to the file, and a default tag. With the 
manifest file ready, the library can be instructed to publish the  contracts to a broker based on their tags.
 
To accompany the manifest file, a suggested workflow is to use a default tag of `develop` and publish these pacts to the broker. Once the provider implements the contract, it is required on the consumer side to manually edit the manifest file and update the relevant contract file(s) to specify a `production` flag instead of `develop`.

## Installation

```bash
yarn add --dev pact-manifest
```

## Usage

### Manifest Manager

```js
const ManifestManager = require('./src/manifestManager')

const manifestManager = new ManifestManager({
  basePath: '/Users/lirantal/projects/forks/myGitProject',
  manifestFile: '/tmp/pact_manifest.json',
  pactFilesPath: 'test/pacts/*.json',
  pactDefaultTag: 'develop'
})

const manifest = await manifestManager.createManifest()
```

### Manifest Publisher

```js
const ManifestPublisher = require('./src/manifestPublisher')

const pactBroker = 'https://test.pact.dius.com.au'
const pactBrokerUsername = 'username'
const pactBrokerPassword = 'password'
const consumerVersion = '1.0.0' // should ideally get this package.json

// Obtain the pacts manifest that ManifestManager creates
// and use the `getManifestsByTag` method to get an object tree
// representation that can be easily iterated to publish the pacts
const manifestByTag = manifestManager.getManifestsByTag(manifest)

let publishedPacts = []

// Iterate on each tag and publish the pact files for it to the broker
for (let [tag, pactFiles] of Object.entries(manifest)) {
  const manifestPublisher = new ManifestPublisher({
	pactFiles: pactFiles,
	broker: {
	  pactBroker: pactBroker,
	  pactBrokerUsername: pactBrokerUsername,
	  pactBrokerPassword: pactBrokerPassword
	},
	consumerVersion: consumerVersion,
	tags: [tag]
  })

  publishedPacts.push(manifestPublisher.publish())
}

const res = await Promise.all(publishedPacts)
```


## Related resources

* [Pact documentation](https://docs.pact.io/)
* [Pact.js implementation](https://github.com/pact-foundation/pact-js)
* [Pact runner on a Docker container](https://github.com/pact-foundation/pact-stub-server)

## Tests

Project tests:

```bash
yarn run test
```

Project linting:

```bash
yarn run lint
```

### Coverage

```bash
yarn run test:coverage
```

## Contributing

### Commit Guidelines

The project uses the commitizen tool for standardizing changelog style
commit messages which you can follow by running `yarn run commit` instead of just `git commit`

```bash
git add <file1> <file2>
yarn run commit
```
