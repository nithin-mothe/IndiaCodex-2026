FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
COPY packages ./packages
COPY apps ./apps
COPY database ./database
RUN npm ci

FROM dependencies AS build
COPY tsconfig*.json ./
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
CMD ["npm", "run", "start", "--workspace", "@trustpay/api"]
