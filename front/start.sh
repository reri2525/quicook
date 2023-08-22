#!/bin/bash
cd app
if [ "$REACT_APP_ENV" = "production" ]; then
    npm run build
    npm start
else
    rm -rf /usr/src/app/app/node_modules/.cache
    mkdir -p /usr/src/app/app/node_modules/.cache
    chown -R node:node /usr/src/app/app/node_modules/.cache
fi
