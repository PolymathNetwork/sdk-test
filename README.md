# Polymesh SDK example

This is a minimal repo to showcase use cases for the Polymesh SDK

## Requirements

- node.js (version 10 or higher)
- yarn

## Examples

At the moment, there is only one sample script that connects to the node, reserves a ticker and creates a Security Token with that ticker

## Instructions

Just clone the repo and in the root run

`yarn`
`yarn start`

That should do it.

If you have access to the GraphQL middleware server and wish to leverage some of its capabilities in the SDK, you can do so by creating a `.env` file in the project root and filling it with

```
MIDDLEWARE_URL=<url>
MIDDLEWARE_KEY=<api_key>
```
