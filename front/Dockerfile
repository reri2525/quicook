FROM node:18.12.1
WORKDIR /usr/src/app
COPY . /usr/src/app
COPY start.sh /usr/src/app
RUN rm -rf /usr/src/app/app/node_modules/.cache
RUN mkdir -p /usr/src/app/app/node_modules/.cache
RUN chown -R node:node /usr/src/app/app/node_modules/.cache
CMD ["bash", "/usr/src/app/start.sh"]