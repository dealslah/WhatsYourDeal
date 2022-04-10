# Builder
# Unnamed as AWS Elastic Beanstalk does not support multistage builds. https://stackoverflow.com/questions/61518512/aws-elastic-beanstalk-docker-does-not-support-multi-stage-build/62031810#62031810
FROM public.ecr.aws/docker/library/node:16-slim
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
COPY --from=0 /usr/src/release .
ENTRYPOINT cd packages/client && yarn start
EXPOSE 3000