# System4Blue

A organisation and logistics tool developed to help (emergency) organisations handle their day-to-day tasks.

## Authors

* [Markus Hinkel](https://github.com/markush97)

## Usage

### Docker (recommended)

1. Copy .env.example as .env and configure it
2. run ```bash docker-compose up -d```

## Documentation

Create documentation in the /documentation sub-folder.
Open the [index-file](documentation/index.html) with a supported browser to view it.

```bash
npm run compodoc
```

Alternatively serve the coverage and refresh automatically with file-changes.
View the documentation in your [browser](https://localhost:8888).

```bash
npm run compodoc:dev
```

For a documentation-coverage report run. This command will fail if the documentation-coverage is below a certain threshold (75% total and 33% per file per default)

```bash
npm run compodoc:cov
```
