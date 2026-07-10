FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json ./
RUN npm install --no-audit --prefer-offline

FROM deps AS build
COPY . .
RUN npx vite build

FROM node:20-alpine AS production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

EXPOSE 3000
CMD ["npx", "serve", "dist/public", "-l", "3000"]
