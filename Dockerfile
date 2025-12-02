# STEP 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

# Copy app source
COPY . .

# Build arg fallback for NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_URL
# If .env.production exists, Next will load it during build automatically.
# If not, we export NEXT_PUBLIC_API_URL env var so Next uses it during build.
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

# runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
