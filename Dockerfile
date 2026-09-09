FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --prefer-offline

FROM deps AS build
# Force cache invalidation on every build
ARG RAILWAY_GIT_COMMIT_SHA=unknown
ARG BUILD_TIMESTAMP=unknown
RUN echo "Building commit: $RAILWAY_GIT_COMMIT_SHA at $BUILD_TIMESTAMP"
COPY . .
# Clean build — remove any stale dist first
RUN rm -rf dist && npx vite build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/api ./api
COPY --from=build /app/db ./db
COPY --from=build /app/contracts ./contracts
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/tsconfig.server.json ./tsconfig.server.json
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "run", "start:server"]
