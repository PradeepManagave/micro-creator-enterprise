FROM node:20-alpine AS base
RUN apk add --no-cache openssl libc6-compat


# Build the project
FROM base AS builder
WORKDIR /app
COPY . .
# Run full install to ensure workspace symlinks and Prisma binaries are perfectly generated for Alpine
RUN npm install

# Build the API explicitly
RUN cd apps/api && npx prisma generate && npx nest build

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
