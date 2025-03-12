"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgJestConfig = void 0;
const jest_util_1 = require("jest-util");
const ts_jest_1 = require("ts-jest");
const defaultProcessWithEsbuildPatterns = ['**/*.mjs'];
class NgJestConfig extends ts_jest_1.ConfigSet {
    constructor(jestConfig, parentLogger) {
        var _a, _b, _c;
        super(jestConfig, parentLogger);
        const jestGlobalsConfig = (_b = (_a = jestConfig === null || jestConfig === void 0 ? void 0 : jestConfig.globals) === null || _a === void 0 ? void 0 : _a.ngJest) !== null && _b !== void 0 ? _b : Object.create(null);
        this.processWithEsbuild = (0, jest_util_1.globsToMatcher)([
            ...((_c = jestGlobalsConfig.processWithEsbuild) !== null && _c !== void 0 ? _c : []),
            ...defaultProcessWithEsbuildPatterns,
        ]);
    }
    _resolveTsConfig(compilerOptions, resolvedConfigFile) {
        const result = super._resolveTsConfig(compilerOptions, resolvedConfigFile);
        result.options.enableIvy = true;
        result.options.noEmitOnError = false;
        result.options.suppressOutputPathCheck = true;
        result.options.allowEmptyCodegenFiles = false;
        result.options.annotationsAs = 'decorators';
        result.options.enableResourceInlining = false;
        result.options.allowJs = true;
        return result;
    }
}
exports.NgJestConfig = NgJestConfig;
