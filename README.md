環境構築手順:<br />
1: git clone git@github.com:reri2525/Quicook_private.git<br />
2: docker-compose build<br />
3: docker-compose run back bundle install<br />
4: docker-compose run front sh -c "cd app && yarn add @emotion/react@^11.10.5 @emotion/styled@^11.10.5 @mui/icons-material@^5.11.0 @mui/material@^5.11.3 axios@^1.2.2 react-hook-form@^7.43.0 react-router-dom@5 sass@^1.57.1"<br />
5: docker-compose run back rails db:create<br />
6: docker-compose run back rails db:create RAILS_ENV=test<br />
7: docker-compose run back rails db:migrate<br />
8: docker-compose up
本番環境の場合は
git pull origin mainした後にcp ./front/app/src/config.production.js ./front/app/src/config.js
でapiurlを変えてcp ./back/config/initializers/carrierwave_production.rb ./back/config/initializers/carrierwave.rb