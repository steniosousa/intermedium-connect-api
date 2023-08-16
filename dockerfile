FROM node:18

WORKDIR /app

COPY package.json package.json
RUN yarn

COPY . .

RUN yarn prisma generate
RUN yarn build

EXPOSE 8080

CMD ["node", "dist/main"]