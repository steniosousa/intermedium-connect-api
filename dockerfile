# Development stage
FROM node:16 as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npx prisma migrate dev
RUN npx prisma generate
COPY tsconfig.json tsconfig.build.json ./
COPY ./src ./src
CMD [ "npm", "run", "start" ]

# Builder stage
FROM development as builder
WORKDIR /usr/src/app
# Build the app with devDependencies still installed from "development" stage
RUN npm run build
# Clear dependencies and reinstall for production (no devDependencies)
RUN rm -rf node_modules
RUN npm ci --only=production


# Production stage
FROM alpine:latest as production
RUN apk --no-cache add nodejs ca-certificates
WORKDIR /root/
COPY --from=builder /usr/src/app ./
CMD [ "node", "dist/main" ]