#!/bin/sh

npm install
npm run -- typings install
npm run ngc
npm run rollup
