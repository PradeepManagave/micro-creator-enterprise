FROM node:20-alpine AS base
RUN apk add --no-cache openssl libc6-compat

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install turbo
RUN npm install -g turbo

COPY package.json package-lock.json ./
COPY turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

RUN npm install

# Build the project
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the project API directly using npm workspaces to avoid Turbo binary issues on Alpine
RUN npm run build --workspace=api

# Production image for Backend API
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy built API and Prisma dependencies
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

EXPOSE 3001

# Command to run the backend API
CMD ["node", "apps/api/dist/main.js"]
