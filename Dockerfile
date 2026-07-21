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
COPY --from=build /app/api ./api
COPY --from=build /app/contracts ./contracts
COPY --from=build /app/db ./db
COPY --from=build /app/tsconfig.server.json ./tsconfig.server.json
COPY package.json ./

EXPOSE 3000
CMD ["npx", "tsx", "api/boot.ts"]
