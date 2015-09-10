var semver = require('semver');

var handlers = [
    {
        name: 'bower',
        handler: require(__dirname + '/handlers/simple_json.js')('bower.json', 'version')
    }, {
        name: 'npm',
        handler: require(__dirname + '/handlers/simple_json.js')('package.json', 'version')
    }, {
        name: 'composer',
        handler: require(__dirname + '/handlers/simple_json.js')('composer.json', 'version')
    }
];

var VersionAlign = function () {
    var self = this;
    var cwd = process.cwd();

    self.getVersions = function () {
        var versions = [];
        var mappedVersions = {};

        for (var i = 0, len = handlers.length; i < len; i++) {
            var handlerObject = handlers[i];
            var detectedVersion = handlerObject
                    .handler
                    .getActual(cwd)
                ;

            if (!detectedVersion) {
                continue;
            }

            versions.push(detectedVersion);
            mappedVersions[handlerObject.name] = detectedVersion;

            console.log('Detected version %s for %s', detectedVersion, handlerObject.name);
        }
        return {
            list: versions,
            mapped: mappedVersions
        };
    };

    self.run = function () {
        var versions = self.getVersions();

        var largest = versions
                .list
                .filter(function (version) {
                    var valid = semver.valid(version);

                    if (!valid) {
                        console.error('Detected invalid semver version - %s', version);
                    }

                    return valid;
                })
                .reduce(function (v1, v2) {
                    return semver.gt(v2, v1) ? v2 : v1;
                })
            ;

        if (typeof largest !== 'string') {
            console.error('Detected version is not valid string ', largest);
        }

        console.log('Found largest version - %s, updating manifests...', largest);

        for (var ii = 0, len = handlers.length; ii < len; ii++) {
            var handlerObject = handlers[ii];

            if (versions.mapped[handlerObject.name] === largest) {
                console.log('Skipping %s, same version', handlerObject.name);
                continue;
            }

            var result = handlerObject
                    .handler
                    .update(cwd, largest)
                ;

            if (result) {
                console.log(
                    'Updated %s to version %s',
                    handler.name,
                    largest
                );
            }
        }

        console.log('Done, kthxbye!');
    };
};

module.exports = new VersionAlign;
