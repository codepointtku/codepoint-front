## Docker
In order to build this project successfully, make sure you have Docker setup correctly for your operating system.

Once you have everything setup:

**Build a Docker image**
```
docker build -t codepoint-front .
```
**Run the container**
```
docker run -dp 3000:3000 codepoint-front
```

