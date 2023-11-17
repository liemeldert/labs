
# Wolbachiadb2mongo

Simple python script to fetch latest data from wolbachiaprojectdb.org and add it to a MongoDB database through a blue/green swap of collections.

## Usage

1. `docker pull ghcr.io/liemeldert/wolbachiadb2mongo:latest`
2. `docker run -e MONGO_URI="mongodb://<username>:<password>@<host>:<port>/<database>" ghcr.io/liemeldert/wolbachiadb2mongo`
