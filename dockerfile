FROM node:18

WORKDIR /app

COPY package.json package.json
RUN yarn ci

COPY . .

RUN yarn prisma generate
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]