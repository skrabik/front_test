# Build stage
FROM node:lts-alpine as build
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration for port 8000
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8000
EXPOSE 8000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]