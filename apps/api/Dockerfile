# Build Stage
FROM node:14.16 AS development

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

RUN nx build api --production

ENTRYPOINT [ "nx", "run" ]

# Production Stage
FROM node:14.16-alpine AS production

LABEL blue.system4.maintainer="markus@hinkel.me"
LABEL blue.system4.author="markush97"

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=development ./usr/src/app/dist/apps/api/package*.json ./

RUN npm install --only=production

# COPY --chown=node:node . ./
COPY --chown=node:node --from=development /usr/src/app/dist/apps/api ./dist

ENV PORT=3333
EXPOSE ${PORT}

CMD ["node", "dist/main"]

