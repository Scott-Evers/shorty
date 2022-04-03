# Shorty API
Allows CRUD operations for short urls in the shorty service

## Build Docker image:
```bash
# build the distributable package
npm run ts:build
# build the docker image
docker build -t shorty-api -f Dockerfile_shorty-api .
```

## Run standalone in Docker:
```bash
docker run -d -p 5002:5002 shorty-api
```