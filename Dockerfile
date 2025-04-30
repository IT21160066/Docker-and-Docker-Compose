# Node.js version 19, which is installed on top of Alpine Linux
FROM node:23-alpine

RUN mkdir -p /app

# Copy local files into the container
# The first COPY command copies the package.json file, and the second one copies the src directory
# COPY <source> <destination>
# Second / for create the directory if not exist

# COPY package.json /app/
# COPY src /app/

COPY ./app /app

# Like cd command in terminal
# The WORKDIR command sets the working directory inside the container to /app
WORKDIR /app

RUN npm install

CMD ["npm", "start"]