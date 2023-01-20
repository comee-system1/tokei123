FROM node:16.18.1-alpine

COPY . /app

WORKDIR /app

RUN cd /app && npm ci
CMD ["npm", "run", "build"]
