FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

ENV PORT=6002

EXPOSE 6002

CMD ["node", "src/app.js"]