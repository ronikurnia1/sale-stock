# Dockerfile
# using debian:jessie for it's smaller size over ubuntu
FROM debian:jessie
MAINTAINER Roni Kurniawan

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Set environment variables
ENV appDir /workspace

# Run updates and install deps
RUN apt-get update

RUN apt-get install -y -q --no-install-recommends \
    apt-transport-https \
    build-essential \
    ca-certificates \
    curl \
    g++ \
    gcc \
    git \
    make \
    nginx \
    sudo \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get -y autoclean

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 5.4.1

# Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# Set up our PATH correctly so we don't have to long-reference npm, node, &c.
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Set the work directory
RUN mkdir -p /workspace
#RUN mkdir -p /workspace
WORKDIR ${appDir}

# Get source code from repo
#RUN git clone https://ronikurniawan:StartNewDay!@bitbucket.org/yesboss/yb-service-telerivet.git /workspace/yb-service-telerivet
# Go into the source folder
WORKDIR /workspace 
# Fetch git branch
#RUN git fetch
# checkout correct branch
#RUN git checkout develop-docker
# git pull
#RUN git pull

# Add our package.json and install *before* adding our application files
ADD package.json ./
# Set npm registry
#RUN npm set registry http://npm.yblabs.co
# npm install
RUN npm i 

# Install pm2 so we can run our application
RUN npm i -g pm2

# Copy source code from host
ADD . /workspace/

WORKDIR ${appDir}

#Expose the port
EXPOSE 8080
CMD ["pm2", "start", "start.js", "--no-daemon"]
