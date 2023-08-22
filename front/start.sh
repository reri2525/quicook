#!/bin/bash
cd app
if [ "$REACT_APP_ENV" = "production" ]; then
    npm run build
    npm start
fi
