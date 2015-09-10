# Version align

Align versions across package manifests.

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

NPM: package.json
Bower: bower.json
Composer: composer.json

### License

Licensed under terms and conditions of Apache 2.0 license.
