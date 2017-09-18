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

@TODO

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
