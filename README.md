# Version align

[![NPM](http://img.shields.io/npm/v/version-align.svg?style=flat-square)](https://www.npmjs.com/package/version-align)

Align versions across package manifests determining the largest version from all the project manifests and then setting that version in all the manifest files.

### Installation

`npm install -g version-align`

### Usage

In the directory where your package manifests are located, run following commandline:

`valign`

You will see output something similar to this:

```
Detected version 2.3.0-alpha for bower
Detected version 2.2.0-alpha for npm
Found largest version - 2.3.0-alpha, updating manifests...
Skipping bower, same version
Done, kthxbye!
```

### Supported manifests

- NPM: package.json
- Bower: bower.json
- Composer: composer.json

### Todo

- Allow forcing the version via CLI option like `valign 1.2.3`

### Why

Version alignment across various packaging systems is a pain and unfortunately, existing tools try and solve this by adding 5 more config files with 10,000 configuration options, simply to bump the version of the project.

Version-Align solves this problem by providing you with one simple tool that aligns all the versions of the manifests to the largest version found by scanning manifest files already in the project.

This way you can easily bump any one manifest file and have all manifest files aligned with it - just like that. No cryptic command line options, additional files to maintain. Easy as it should be.

### License

Licensed under terms and conditions of Apache 2.0 license.
