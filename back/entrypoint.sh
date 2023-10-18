#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid
if [ "$RAILS_ENV" = "production" ]; then
    DISABLE_DATABASE_ENVIRONMENT_CHECK=1 rails db:migrate:reset RAILS_ENV=production
    rails db:seed RAILS_ENV=production
    bundle exec pumactl start
else
    ls
fi


# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"