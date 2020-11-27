FROM node:current-alpine AS builder

WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM node:current-alpine
WORKDIR /usr/src/app
COPY --from=builder /build/package*.json /build/dist/ .
RUN npm install

CMD [ "node", "app.js" ]
EXPOSE 8000
