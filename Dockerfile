FROM node:17.0.1-alpine3.13@sha256:9ca5570f827fa5207d0e5e38138f244cdeffec854ed94cc7053abfb62db988bd AS development

WORKDIR /srv/app/

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY ./ ./

CMD ["yarn", "run", "dev"]


FROM node:17.0.1-alpine3.13@sha256:9ca5570f827fa5207d0e5e38138f244cdeffec854ed94cc7053abfb62db988bd AS build

ENV NODE_ENV=production

WORKDIR /srv/app/

COPY --from=development /srv/app/ ./

RUN yarn run lint \
    && yarn run test \
    && yarn run build

# Discard devDependencies.
RUN yarn install


FROM node:17.0.1-alpine3.13@sha256:9ca5570f827fa5207d0e5e38138f244cdeffec854ed94cc7053abfb62db988bd AS production

ENV NODE_ENV=production

WORKDIR /srv/app/

COPY --from=build /srv/app/dist/ /srv/app/dist/
COPY --from=build /srv/app/node_modules/ /srv/app/node_modules/

CMD ["node", "./dist/stomper.js"]