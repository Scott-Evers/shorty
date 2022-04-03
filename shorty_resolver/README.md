# Shorty Resolver
This application resolves URLs to their long form, and redirects users to the target location.  This application depends on the Redis resolver database.  See below for deployment details

## Build Docker image:
```bash
docker build -t shorty-resolver -f Dockerfile_shorty-resolver .
```

## Run standalone in Docker:
```bash
docker run -d -p 6379:6379 redis:alpine "--requirepass my_password"
docker run -d -e REDIS_URL="redis://10.0.1.27:6379" -e REDIS_PWD="my_password" -p 5003:5003 shorty-resolver
```