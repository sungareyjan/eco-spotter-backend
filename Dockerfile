FROM node:20-alpine


RUN apk add --no-cache libc6-compat && \
npm install -g pnpm@8.14.1

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml ./

# Install app dependencies
# RUN npm Install
RUN pnpm install

# Copy app source code
COPY . .


# Expose endpoint /port (Always to port sa docker)
# Machine port and container port inside the container
EXPOSE 3000

# Start server
CMD ["node","src/server.js"]