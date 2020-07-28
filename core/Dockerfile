# Build
FROM node:14-alpine AS bookshelf-app-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run clean
RUN npm run build

#Deploy
FROM node:14-alpine AS bookshelf-app
WORKDIR /app
COPY --from=bookshelf-app-builder ./app/dist ./dist
COPY package* ./
COPY public ./public
COPY config ./config
COPY views ./views
RUN npm install --production
CMD npm start