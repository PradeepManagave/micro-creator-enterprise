FROM node:20-slim AS base
RUN apt-get update -y && apt-get install -y openssl


# Build the project
FROM base AS builder
WORKDIR /app
COPY . .
# Run full install to ensure workspace symlinks and Prisma binaries are perfectly generated for Alpine
RUN npm install

# Provide a dummy DATABASE_URL so Prisma generate does not fail validation during Docker build
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

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
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

EXPOSE 3001

# Command to run the backend API
CMD ["sh", "-c", "npx prisma db push --schema=apps/api/prisma/schema.prisma --accept-data-loss && node apps/api/dist/main.js"]
