# Base dependency
FROM node:16

# Create app directory
WORKDIR /usr/app

# ENV:APP
ENV APP_NAME='Iracema'
ENV APP_VERSION='v1'

# ENV:NODE
ENV NODE_ENV=production
ENV PORT=3333

# ENV:Database
ENV DB_HOST=db
ENV DB_PORT=5432
# ENV DB_USER=<.env>
# ENV DB_PASSWORD=<.env>
ENV DB_NAME=iracema-db

# ENV:Auth
ENV MIN_SALT=6
ENV MAX_SALT=12
# ENV TOKEN_SECRET=<.env>
# ENV TOKEN_LIFE=<.env>
# ENV REFRESH_SECRET=<.env>
# ENV REFRESH_LIFE=<.env>

# ENV:Pagination
ENV PAGE_SIZE=15

# Coping Dependencies
COPY package*.json ./

# Setting cash folder
RUN npm config set cache /tmp --global

# Installing Dependencies
RUN npm install --silent

# BUNDLE app source (copying code)
COPY . .

# PORT
EXPOSE $PORT

# Start command
CMD [ "node", "src/server.js" ]