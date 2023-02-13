FROM node:16.18.1-alpine

COPY . /app
RUN cd /app && \
    npm ci && \
    apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata

WORKDIR /app

CMD ["npm", "start"]
