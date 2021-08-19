# Codepoint - Front-end

[![codecov](https://codecov.io/gh/codepointtku/codepoint-front/branch/develop/graph/badge.svg?token=f63W1HtqyG)](https://codecov.io/gh/codepointtku/codepoint-front)

**Codepoint's Front-end web application.**

* **Technologies:** Front-end is built with Next.js. We do our tests with Jest.js, and use our own linter and prettier configs for this project.
* **Open Source:** Meaning, that you may fork, copy and use this product, **completely free**. Let us know if you'd like to collaborate or contribute with us.

[Contact for questions, information and to contribute](mailto:juuso.laakso@turku.fi)

## Requirements
[Node.js](https://nodejs.org/) v16 Current (16.3) or greater

## Quick Start
**Clone** the repository and run
```bash
$ npm install
```

**Setup** a `.env.local`
```env
NEXT_PUBLIC_TOKEN=*Endpoint token*
NEXT_PUBLIC_GRAPHQL_URL=*Graphql End-point url*
```

**Run** the project!
```bash
$ npm start
```

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

## License
This repository is released under the [MIT License](LICENSE)