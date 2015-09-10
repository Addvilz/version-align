var fs = require('fs');

var SimpleJsonHandler = function (jsonFile, fieldName) {
    var self = this;
    self.options = {
        file: jsonFile,
        field: fieldName
    };


    self.getFile = function (cwd) {
        return cwd + '/' + self.options.file;
    };

    self.getActual = function (cwd) {
        var file = self.getFile(cwd);

        if (fs.existsSync(file)) {
            var jsonContents = require(file);

            if (typeof jsonContents[self.options.field] !== 'undefined') {
                return jsonContents[self.options.field];
            }
        }

        return false;
    };

    self.update = function (cwd, version) {

        var file = self.getFile(cwd);

        if (fs.existsSync(file)) {

            var jsonContents = require(file);

            jsonContents[self.options.field] = version;

            return fs.writeFileSync(file, JSON.stringify(jsonContents, null, 2));
        }

        return false;
    }
};

module.exports = function (jsonName, fieldName) {
    return new SimpleJsonHandler(jsonName, fieldName);
};