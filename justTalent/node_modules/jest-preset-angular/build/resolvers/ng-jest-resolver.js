"use strict";
const ngJestResolver = (path, options) => {
    return options.defaultResolver(path, Object.assign(Object.assign({}, options), { packageFilter(pkg) {
            return Object.assign(Object.assign({}, pkg), { main: pkg.main || pkg.es2015 || pkg.module });
        } }));
};
module.exports = ngJestResolver;
