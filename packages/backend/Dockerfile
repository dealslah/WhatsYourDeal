# Builder
FROM node:16-slim AS builder
WORKDIR /usr/src/build

COPY . ./
RUN yarn install --production --frozen-lockfile

RUN mkdir -p /usr/src/release
RUN mkdir -p /usr/src/release/packages/backend
RUN cp -R node_modules /usr/src/release/node_modules
RUN cp -R packages/backend/node_modules /usr/src/release/packages/backend/node_modules
RUN cp -R packages/backend/package.json /usr/src/release/packages/backend/package.json

RUN yarn install --frozen-lockfile
RUN cd packages/backend && yarn build
RUN cp -R packages/backend/dist /usr/src/release/packages/backend/dist

# Release
FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/release .
ENV NODE_ENV=production
ENTRYPOINT cd packages/backend && yarn start:prod
EXPOSE 8080