
FROM node AS builder
WORKDIR /app

# 1. Cache dependencies
COPY package*.json ./
RUN npm ci

# 2. Copy source & build
COPY . ./
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# 1. Remove default content
RUN rm -rf ./*

# 2. Copy built assets
COPY --from=builder /app/dist ./

# Note: Custom nginx.conf is mounted via docker-compose to handle API proxy

# Expose HTTP port
EXPOSE 80

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]