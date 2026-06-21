# STAGE 1: Build Stage 
FROM node:20.19.0 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build the React app
COPY . .
RUN npm run build

# STAGE 2: Production Stage (Nginx) 
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Stage 1 build folder recived and copy to nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 80 port  
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]