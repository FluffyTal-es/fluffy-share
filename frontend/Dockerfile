# => Build container
FROM node:alpine AS build

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

COPY ./src ./src
COPY ./public ./public
COPY ./conf ./conf

RUN npm ci
RUN npm run --openssl-legacy-provider build

# Start Nginx server
CMD ["/bin/sh", "-c", "CHOKIDAR_USEPOLLING=true node_modules/.bin/react-scripts --openssl-legacy-provider start"]

# => Run container
FROM nginx:stable-alpine AS final

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=build /app/build /usr/share/nginx/html


# Default port exposure
EXPOSE 80 3000

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

COPY ./env.sh ./
COPY ./.env ./

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
