# XSS chatroom demo project

## Prerequisites

Docker or Node 16+

## Usage

```
git clone git@github.com:tranxuanthang/xss-chatroom-demo.git
cd xss-chatroom-demo
node index.js
```

Then visit http://localhost:3000 to start hacking.

## Usage docker

```
docker pull tranxuanthang/xss-chatroom-demo
docker run --rm -it --init -p 3000:3000 tranxuanthang/xss-chatroom-demo
```

Then visit http://localhost:3000 to start hacking.

## Development

Build new Docker image:

```
docker build -t tranxuanthang/xss-chatroom-demo:latest .
```

Push new image to Docker Hub:

```
docker push tranxuanthang/xss-chatroom-demo:latest
```
