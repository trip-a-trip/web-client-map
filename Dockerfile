FROM node:12-alpine as build

WORKDIR /app

ENV NODE_ENV=production

COPY . .
RUN yarn
RUN yarn build

FROM nginx:1.19-alpine

COPY ./trip.conf.template /etc/nginx/templates/trip.conf.template

COPY --from=build /app/public /srv/www