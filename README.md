# Version align

[![NPM](http://img.shields.io/npm/v/version-align.svg?style=flat-square)](https://www.npmjs.com/package/version-align)

Align versions across package manifests determining the largest version from all the project manifests and then setting that version in all the manifest files.

### Installation

`npm install -g version-align`

### Supported manifests

- NPM: package.json
- Bower: bower.json
- Composer: composer.json

*NB: you probably have a manifest format you want to see in this list - please, suggest those in the issues, or if you feel generous - open a pull request! :)*

### Usage

In the directory where your package manifests are located, run following commandline:

`valign [forced version]`

There is only one argument you can pass - a forced version to be set instead of the one detected.

You will see output something similar to this:

```
Detected version 0.9.1 for npm
Forcing largest version to 0.9.3 instead of 0.9.1 as requested
Found largest manifest version - 0.9.3
Detected invalid semver version in GIT - 1.0
WARN: GIT has a version tag 1.2.0 that is larger than largest detected manifest version 0.9.3
Done, kthxbye!
```

Version-Align will also check for git tags, try and guess the largest one and if there is a tag with a version largest than detected or forced version - you will be kindly notified and given a chance to reconsider your actions against world.

### Why

Version alignment across various packaging systems is a pain and unfortunately, existing tools try and solve this by adding 5 more config files with 10,000 configuration options, simply to bump the version of the project.

Version-Align solves this problem by providing you with one simple tool that aligns all the versions of the manifests to the largest version found by scanning manifest files already in the project.

This way you can easily bump any one manifest file and have all manifest files aligned with it - just like that. No cryptic command line options, additional files to maintain. Easy as it should be.

### License

Licensed under terms and conditions of Apache 2.0 license.
