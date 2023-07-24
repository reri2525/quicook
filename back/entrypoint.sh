#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid
if [ "$RAILS_ENV" = "production" ]; then
    bundle exec pumactl start
elif [ "$RAILS_ENV" = "development" ]; then
    rails db:create RAILS_ENV=development
    rails db:migrate:reset RAILS_ENV=development
    rails db:seed RAILS_ENV=development
    rails server -b 0.0.0.0 -p 3001 -e development
else
    echo "Invalid RAILS_ENV value. Supported values: development, production."
    exit 1
fi


# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"