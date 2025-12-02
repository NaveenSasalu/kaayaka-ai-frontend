# STEP 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

# Copy app source
COPY . .

# Copy prod environment file
COPY .env.production .env.production

# Build Next.js
RUN NEXT_PUBLIC_API_URL=$(grep NEXT_PUBLIC_API_URL .env.production | cut -d '=' -f2) npm run build

# STEP 2 — Run
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
