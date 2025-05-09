# -------- Stage 1: Build the Vite app --------
FROM node:18-alpine AS builder

# Use a smaller image (alpine), reduce layers
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --prefer-offline

# Copy rest of app
COPY . .

# Build for production
RUN npm run build


# -------- Stage 2: Serve with Nginx --------
FROM nginx:1.25-alpine

# Clean default Nginx HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Optional: Set cache headers to force fresh content
# Can be handled in nginx.conf instead

EXPOSE 80

# Don't daemonize to let container stay in foreground
CMD ["nginx", "-g", "daemon off;"]