# Build the app
FROM node:14.16-alpine AS builder

LABEL blue.system4.maintainer="markus@hinkel.me"
LABEL blue.system4.author="markush97"

RUN npm install -g nx

RUN mkdir -p /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app

USER node

WORKDIR /usr/src/app

COPY --chown=node:node ./decorate-angular-cli.js ./
COPY --chown=node:node ./package*.json ./

RUN npm install

COPY --chown=node:node . ./

RUN nx build admin --configuration=production

ENTRYPOINT [ "nx", "run" ]

# Deploy with nginx
FROM nginx:1.16.0-alpine

LABEL blue.system4.maintainer="markus@hinkel.me"
LABEL blue.system4.author="markush97"

ARG APP_PORT=80
ENV APP_PORT=${APP_PORT}

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/dist/admin/out/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE ${APP_PORT}
