#!/bin/bash
cd app
if [ "$REACT_APP_ENV" = "production" ]; then
    npm run build
    npm start
else 
    sudo chmod 777 /usr/src/app/app/node_modules/.cache
fi
