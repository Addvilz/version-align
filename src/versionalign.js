var semver = require('semver');
var gitTagResolver = require('./git_tag_resolver.js');

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

    self.run = function (forcedLargest) {
        var versions = self.getVersions();

        if (0 === versions.length) {
            console.error('No manifests detected, nothing to do');
            return;
        }

        var filtered = versions
            .list
            .filter(function (version) {
                var valid = semver.valid(version);

                if (!valid) {
                    console.error('Detected invalid semver version - %s', version);
                }

                return valid;
            });

        if (0 === filtered.length) {
            console.error('No valid versions detected... Nothing to do.');
            if (!forcedLargest) {
                return;
            } else {
                filtered = [];
            }
        }

        var largest = filtered.reduce(function (v1, v2) {
            return semver.gt(v2, v1) ? v2 : v1;
        });

        if (forcedLargest) {
            console.log('Forcing largest version to %s instead of %s as requested', forcedLargest, largest);
            largest = forcedLargest;
        }

        if (typeof largest !== 'string') {
            console.error('Detected version is not valid string ', largest);
        }

        console.log('Found largest manifest version - %s', largest);

        var onGitResponded = function (gitVersion, err, stderr) {

            if (gitVersion && semver.valid(largest) && semver.gt(gitVersion, largest)) {
                console.error('WARN: GIT has a version tag %s that is larger than largest detected manifest version %s', gitVersion, largest);
            }

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

        gitTagResolver(cwd, onGitResponded);
    };
};

module.exports = new VersionAlign;
