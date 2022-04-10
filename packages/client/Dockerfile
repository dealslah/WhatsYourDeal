# Builder
FROM public.ecr.aws/docker/library/node:16-slim AS builder
WORKDIR /usr/src/build

COPY package.json yarn.lock ./
COPY packages/client/package.json ./packages/client/
COPY packages/backend/package.json ./packages/backend/
COPY packages/backend/types ./packages/backend/
RUN yarn install --production --frozen-lockfile

RUN mkdir -p /usr/src/release
RUN mkdir -p /usr/src/release/packages/client
RUN cp -R node_modules /usr/src/release/node_modules
RUN cp -R packages/client/node_modules /usr/src/release/packages/client/node_modules
RUN cp packages/client/package.json /usr/src/release/packages/client/package.json

RUN yarn install --frozen-lockfile
COPY . ./
RUN cd packages/client && yarn build
RUN cp -R packages/client/.next  /usr/src/release/packages/client/.next

# Release
FROM public.ecr.aws/docker/library/node:16-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/release .
ENTRYPOINT cd packages/client && yarn start
EXPOSE 3000