FROM alpine:latest as builder

WORKDIR /usr/apps/api

RUN apk update --no-cache && apk add nodejs npm

COPY package.json .
COPY package-lock.json .

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

FROM alpine:latest as production

WORKDIR /usr/apps/api

RUN apk update --no-cache && apk add nodejs npm bash

COPY --from=builder /usr/apps/api .

RUN npm install -g prisma dotenv-cli

RUN npm install --omit=dev --ignore-scripts --legacy-peer-deps

RUN npm run generate

CMD ["npm", "run", "start"]