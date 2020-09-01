FROM node:12-alpine

ENV NODE_ENV=production

COPY . .
RUN yarn
RUN yarn build

EXPOSE 8080

CMD ["yarn", "node", "./proxy.js"]
