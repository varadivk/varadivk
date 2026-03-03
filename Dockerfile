# use same base image the user referenced to ensure node/npm are available
FROM node:24-alpine

# create app directory
WORKDIR /usr/src/app

# install dependencies early to take advantage of caching
COPY package.json package-lock.json* ./
RUN npm ci --silent || npm install --silent

# copy the rest of the source
COPY . .

# expose port that Next.js uses
EXPOSE 3000

# default command when container starts
CMD ["npm", "run", "dev"]
