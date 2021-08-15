# ka-mensa-ui

[![CI](https://github.com/meyfa/ka-mensa-ui/actions/workflows/main.yml/badge.svg)](https://github.com/meyfa/ka-mensa-ui/actions/workflows/main.yml)


## Introduction

`ka-mensa-ui` is one component in a three-part project whose goal it is to
aggregate, process and visualize the Studierendenwerk Karlsruhe's canteen plans
in ways superior to the official sources.

**Disclaimer:** This project is neither affiliated with nor endorsed by the
Studierendenwerk Karlsruhe or the Karlsruhe Institute of Technology.

The entire project is written in JavaScript+TypeScript and is composed as follows:

- [ka-mensa-fetch](https://github.com/meyfa/ka-mensa-fetch): library package
    responsible for the fetching of raw plan data and conversion into canonical,
    easily digestible JSON documents
- [ka-mensa-api](https://github.com/meyfa/ka-mensa-api): NodeJS server that
    utilizes the fetcher to continuously collect meal plans and makes them
    available via REST API
- [ka-mensa-ui](https://github.com/meyfa/ka-mensa-ui): single-page web app
    that loads meal plans from an API instance and displays them in a modern,
    responsive interface with filtering and color-coding capabilities


## Setup

Make sure to have a `ka-mensa-api` server running and publicly accessible.
If on another domain, you have to configure your server to set CORS headers.

Then, clone this repository somewhere. Run `npm install` (Node and npm must be
installed on your system!).

Open up `config/index.js` and configure to your liking. Pay special attention to
setting the API endpoint so that requests can be sent to your API server.

If you now run `npm run build`, the frontend will be compiled with the
configured options and the result placed in the `dist` directory. Throw it on a
webserver and load it up to see a fancy canteen plan UI.


## Development

Contributions are welcome. Guidelines:

- By contributing, you agree to make your changes available under the MIT
    license of this project.
- Please write unit tests for as much code as possible.
    * To run: `npm test`
- Make sure to adhere to JS standard style and proper usage of TypeScript.
    * Linter: `npm run lint`
    * Automatic fixing of most style issues: `npm run lint-fix`

To make developing easier, a dev server with hot update capabilities can be
started via `npm run dev`.
