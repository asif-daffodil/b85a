/*!
 * Ported from https://github.com/expressjs/express/blob/master/lib/view.js
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _View_instances, _View_lookup, _View_resolve;
import { statSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
function tryStat(path) {
    try {
        return statSync(path);
    }
    catch (e) {
        return undefined;
    }
}
/**
 * Initialize a new `View` with the given `name`.
 *
 * Options:
 *
 *   - `defaultEngine` the default template engine name
 *   - `engines` template engine require() cache
 *   - `root` root path for view lookup
 *
 * @param name
 * @param options
 * @public
 */
export class View {
    constructor(name, opts = {}) {
        var _a;
        _View_instances.add(this);
        this.root = [];
        this.ext = extname(name);
        this.name = name;
        if (opts.root)
            this.root = opts.root;
        if (opts.defaultEngine)
            this.defaultEngine = opts.defaultEngine;
        if (!this.ext && !this.defaultEngine)
            throw new Error('No default engine was specified and no extension was provided.');
        let fileName = name;
        if (!this.ext) {
            // get extension from default engine name
            this.ext = this.defaultEngine[0] !== '.' ? `.${this.defaultEngine}` : this.defaultEngine;
            fileName += this.ext;
        }
        if (!((_a = opts.engines) === null || _a === void 0 ? void 0 : _a[this.ext]))
            throw new Error(`No engine was found for ${this.ext}`);
        this.engine = opts.engines[this.ext];
        this.path = __classPrivateFieldGet(this, _View_instances, "m", _View_lookup).call(this, fileName);
    }
    render(options, data, cb) {
        this.engine(this.path, data, options, cb);
    }
}
_View_instances = new WeakSet(), _View_lookup = function _View_lookup(name) {
    let path;
    const roots = [].concat(this.root);
    for (let i = 0; i < roots.length && !path; i++) {
        const root = roots[i];
        // resolve the path
        const loc = resolve(root, name);
        const dir = dirname(loc);
        const file = basename(loc);
        // resolve the file
        path = __classPrivateFieldGet(this, _View_instances, "m", _View_resolve).call(this, dir, file);
    }
    return path;
}, _View_resolve = function _View_resolve(dir, file) {
    const ext = this.ext;
    // <path>.<ext>
    let path = join(dir, file);
    let stat = tryStat(path);
    if (stat === null || stat === void 0 ? void 0 : stat.isFile()) {
        return path;
    }
    // <path>/index.<ext>
    path = join(dir, basename(file, ext), `index${ext}`);
    stat = tryStat(path);
    if (stat === null || stat === void 0 ? void 0 : stat.isFile()) {
        return path;
    }
};
//# sourceMappingURL=view.js.map