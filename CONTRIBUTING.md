# Contributing

Please follow instructions below if you want to contribute.

## Documentation

To create a new documentation for _my-project_ via compodoc execute the follwing:

```bash
nx run <my-project>:compodoc
```

## Release

To release a new version for _my-project_:


```bash
nx run my-project:version --changelog-header="# Test"
```

### Specified Level Change

Release a project with a version that is incremented by a specified level.
Level can be one of: `major`, `minor`, `patch`, `premajor`, `preminor`, `prepatch`, or `prerelease`:

```bash
nx run workspace:version --version=major
nx run workspace:version --version=minor
nx run workspace:version --version=patch
nx run workspace:version --version=prerelease --preid=alpha
nx run workspace:version --version=prerelease --preid=beta
```
