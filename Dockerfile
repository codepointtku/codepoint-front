# Use the official image as a parent image.
FROM node:16-alpine
RUN apk --no-cache libc6-compat

# Set the working directory.
WORKDIR /app

# Copy dependencies.
COPY package.json package-lock.json .

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Install, Build and Run.
RUN npm install && npm run build && npm run dev

# next.config.js for Docker.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Describe which port the container is listening on at runtime.
EXPOSE 3000

# Run the specified command within the container.
CMD ["npm", "start"]
