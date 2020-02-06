# ka-mensa-ui

[![Build Status](https://travis-ci.com/meyfa/ka-mensa-ui.svg?branch=master)](https://travis-ci.com/meyfa/ka-mensa-ui)

A fancy user interface for the Karlsruhe (KIT) Mensa meal plan, for use in
conjunction with [ka-mensa-api](https://github.com/meyfa/ka-mensa-api).

This project is neither affiliated with nor endorsed by the Studierendenwerk
Karlsruhe or the Karlsruhe Institute of Technology.

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
