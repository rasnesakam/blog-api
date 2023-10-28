FROM node:18
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .

RUN yarn prisma generate
RUN yarn build
ENTRYPOINT [ "yarn" ]
CMD [ "run", "start" ]