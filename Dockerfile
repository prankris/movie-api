# ---------- Stage 1: Build ----------
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies and build the app
COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build


# ---------- Stage 2: Production ----------
FROM node:24-alpine

WORKDIR /app

# Copy only necessary files from build stage
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Set environment variables (can be overridden in docker-compose)
ENV NODE_ENV=production
ENV PORT=3000
ENV MOVIES_DB_PATH=/db/movies.db
ENV RATINGS_DB_PATH=/db/ratings.db

EXPOSE 3000

CMD ["node", "dist/server.js"]
