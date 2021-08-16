# Sets node:alpine as a parent image.
FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat

# Sets the working directory and runs npm install (switch to ci later).
WORKDIR /app
RUN npm install

# Copies the dependency tree.
COPY package.json package-lock.json .

# Build section
FROM node:alpine as builder
WORKDIR /app
# Copies the rest of your app's code from your to your image filesystem.
COPY . .
RUN npm run build

# Nextjs configs and filepaths.
FROM node:alpine AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Sets Nodejs to production.
ENV NODE_ENV production

# Describe which port the container is listening on at runtime.
EXPOSE 3000

# Runs the specified command within the container.
CMD ["npm", "run", "dev"]