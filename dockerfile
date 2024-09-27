FROM node:18-alpine
WORKDIR /plateforme-safebase
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["node", "app.js"]