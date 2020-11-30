FROM node:current-alpine AS builder

WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM node:current-alpine
WORKDIR /usr/src/app
COPY --from=builder /build/ormconfig.json /build/package*.json /build/dist/ ./
RUN sed 's|dist/||' -i ormconfig.json && npm install --only=prod
COPY --from=builder /build/exe /usr/local/bin/exe
RUN chmod +x /usr/local/bin/exe && apk add mariadb-client

CMD [ "node", "app.js" ]
EXPOSE 8000
