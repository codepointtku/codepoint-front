# Codepoint - Front-end

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
TOKEN=*Your github token*
```

**Run** the project!
```bash
$ npm start
```

**build docker image**:
```
docker build -t codepoint-tku .
```
**mount image**
```
docker run --name [name of container] codepoint-tku
```

## License
This repository is released under the [MIT License](LICENSE)