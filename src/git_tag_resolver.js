var childProcess = require('child_process');
var semver = require('semver');

module.exports = function (cwd, callback) {

    var cw = callback;

    var options = {
        'cwd': cwd
    };

    childProcess.exec('git tag', options, function (err, stdout, stderr) {
        if (err || stderr) {
            cw(false, err, stderr);
            return;
        }

        var tagsOutput = stdout
                .trim()
                .split("\n")
            ;

        if ('' === stdout.trim() || 0 === tagsOutput.length) {
            cw(false);
            return;
        }

        var filteredGitTags = tagsOutput
            .filter(function (version) {
                var valid = semver.valid(version);

                if (!valid) {
                    console.error('Detected invalid semver version in GIT - %s', version);
                }

                return valid;
            });

        if (!filteredGitTags.length) {
            cw(false);
            return;
        }

        var largestGitVersion = filteredGitTags.reduce(function (v1, v2) {
                return semver.gt(v2, v1) ? v2 : v1;
            })
            ;

        cw(semver.clean(largestGitVersion));
    });
};