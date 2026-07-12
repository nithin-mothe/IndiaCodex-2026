FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
COPY packages ./packages
COPY workers ./workers
RUN npm ci

FROM dependencies AS build
COPY tsconfig*.json ./
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
CMD ["npm", "run", "validate:env"]
