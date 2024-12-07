var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _App_instances, _App_find;
import { createServer } from 'node:http';
import { getPathname } from '@tinyhttp/req';
import { Router, pushMiddleware } from '@tinyhttp/router';
import { parse as rg } from 'regexparam';
import { extendMiddleware } from './extend.js';
import { onErrorHandler } from './onError.js';
import { getURLParams } from './request.js';
import { View } from './view.js';
/**
 * Add leading slash if not present (e.g. path -> /path, /path -> /path)
 * @param x
 */
const lead = (x) => (x.charCodeAt(0) === 47 ? x : `/${x}`);
const trail = (x) => (x.charCodeAt(x.length - 1) === 47 ? x.substring(0, x.length - 1) : x);
const mount = (fn) => (fn instanceof App ? fn.attach : fn);
const applyHandler = (h) => async (req, res, next) => {
    try {
        if (h[Symbol.toStringTag] === 'AsyncFunction') {
            await h(req, res, next);
        }
        else
            h(req, res, next);
    }
    catch (e) {
        next(e);
    }
};
/**
 * `App` class - the starting point of tinyhttp app.
 *
 * With the `App` you can:
 * * use routing methods and `.use(...)`
 * * set no match (404) and error (500) handlers
 * * configure template engines
 * * store data in locals
 * * listen the http server on a specified port
 *
 * In case you use TypeScript, you can pass custom types to this class because it is also a generic class.
 *
 * Example:
 *
 * ```ts
 * interface CoolReq extends Request {
 *  genericsAreDope: boolean
 * }
 *
 * const app = App<any, CoolReq, Response>()
 * ```
 */
export class App extends Router {
    constructor(options = {}) {
        super();
        _App_instances.add(this);
        this.middleware = [];
        this.locals = {};
        this.engines = {};
        this.onError = (options === null || options === void 0 ? void 0 : options.onError) || onErrorHandler;
        // @ts-expect-error typescript is not smart enough to understand "this" ts(2345)
        this.noMatchHandler = (options === null || options === void 0 ? void 0 : options.noMatchHandler) || this.onError.bind(this, { code: 404 });
        this.settings = {
            view: View,
            xPoweredBy: true,
            views: `${process.cwd()}/views`,
            'view cache': process.env.NODE_ENV === 'production',
            'trust proxy': 0,
            ...options.settings
        };
        if (options.applyExtensions)
            this.applyExtensions = options === null || options === void 0 ? void 0 : options.applyExtensions;
        const boundHandler = this.handler.bind(this);
        this.attach = (req, res, next) => setImmediate(boundHandler, req, res, next);
        this.cache = {};
    }
    /**
     * Set app setting
     * @param setting setting name
     * @param value setting value
     */
    set(setting, value) {
        this.settings[setting] = value;
        return this;
    }
    /**
     * Enable app setting
     * @param setting Setting name
     */
    enable(setting) {
        this.settings[setting] = true;
        return this;
    }
    /**
     * Check if setting is enabled
     * @param setting Setting name
     * @returns
     */
    enabled(setting) {
        return Boolean(this.settings[setting]);
    }
    /**
     * Disable app setting
     * @param setting Setting name
     */
    disable(setting) {
        this.settings[setting] = false;
        return this;
    }
    /**
     * Return the app's absolute pathname
     * based on the parent(s) that have
     * mounted it.
     *
     * For example if the application was
     * mounted as `"/admin"`, which itself
     * was mounted as `"/blog"` then the
     * return value would be `"/blog/admin"`.
     *
     */
    path() {
        return this.parent ? this.parent.path() + this.mountpath : '';
    }
    /**
     * Register a template engine with extension
     */
    engine(ext, fn) {
        this.engines[ext[0] === '.' ? ext : `.${ext}`] = fn;
        return this;
    }
    /**
     * Render a template
     * @param name What to render
     * @param data data that is passed to a template
     * @param options Template engine options
     * @param cb Callback that consumes error and html
     */
    render(name, data = {}, options = {}, cb = () => { }) {
        let view;
        const { _locals, ...opts } = options;
        let locals = this.locals;
        if (_locals)
            locals = { ...locals, ..._locals };
        locals = { ...locals, ...data };
        if (opts.cache == null)
            opts.cache = this.enabled('view cache');
        if (opts.cache) {
            view = this.cache[name];
        }
        if (!view) {
            const View = this.settings.view;
            view = new View(name, {
                defaultEngine: this.settings['view engine'],
                root: this.settings.views,
                engines: this.engines
            });
            if (!view.path) {
                const dirs = Array.isArray(view.root) && view.root.length > 1
                    ? `directories "${view.root.slice(0, -1).join('", "')}" or "${view.root[view.root.length - 1]}"`
                    : `directory "${view.root}"`;
                const err = new Error(`Failed to lookup view "${name}" in views ${dirs}`);
                return cb(err);
            }
            if (opts.cache) {
                this.cache[name] = view;
            }
        }
        try {
            view.render(opts, locals, cb);
        }
        catch (err) {
            cb(err);
        }
    }
    use(...args) {
        var _a;
        const base = args[0];
        const fns = args.slice(1).flat();
        let pathArray = [];
        if (typeof base === 'function' || base instanceof App) {
            fns.unshift(base);
        }
        else {
            // if base is not an array of paths, then convert it to an array.
            let basePaths = [];
            if (Array.isArray(base))
                basePaths = base;
            else if (typeof base === 'string')
                basePaths = [base];
            basePaths = basePaths.filter((element) => {
                if (typeof element === 'string') {
                    pathArray.push(element);
                    return false;
                }
                return true;
            });
            fns.unshift(...basePaths);
        }
        pathArray = pathArray.length ? pathArray.map((path) => lead(path)) : ['/'];
        const mountpath = pathArray.join(', ');
        let regex;
        for (const fn of fns) {
            if (fn instanceof App) {
                for (const path of pathArray) {
                    regex = rg(path, true);
                    fn.mountpath = mountpath;
                    this.apps[path] = fn;
                    // @ts-expect-error typescript is not smart enough to understand "this" ts(2345)
                    fn.parent = this;
                }
            }
        }
        for (const path of pathArray) {
            const handlerPaths = [];
            const handlerFunctions = [];
            const handlerPathBase = path === '/' ? '' : lead(path);
            for (const fn of fns) {
                if (fn instanceof App && ((_a = fn.middleware) === null || _a === void 0 ? void 0 : _a.length)) {
                    for (const mw of fn.middleware) {
                        handlerPaths.push(handlerPathBase + lead(mw.path));
                        handlerFunctions.push(fn);
                    }
                }
                else {
                    handlerPaths.push('');
                    handlerFunctions.push(fn);
                }
            }
            pushMiddleware(this.middleware)({
                path,
                regex,
                type: 'mw',
                handler: mount(handlerFunctions[0]),
                handlers: handlerFunctions.slice(1).map(mount),
                fullPaths: handlerPaths
            });
        }
        return this;
    }
    route(path) {
        const app = new App({ settings: this.settings });
        this.use(path, app);
        return app;
    }
    /**
     * Extends Req / Res objects, pushes 404 and 500 handlers, dispatches middleware
     * @param req Req object
     * @param res Res object
     * @param next 'Next' function
     */
    handler(req, res, next) {
        /* Set X-Powered-By header */
        const { xPoweredBy } = this.settings;
        if (xPoweredBy)
            res.setHeader('X-Powered-By', typeof xPoweredBy === 'string' ? xPoweredBy : 'tinyhttp');
        // @ts-expect-error typescript is not smart enough to understand "this" ts(2345)
        const exts = this.applyExtensions || extendMiddleware(this);
        let mw = [
            {
                handler: exts,
                type: 'mw',
                path: '/'
            }
        ];
        req.baseUrl = '';
        const handle = (mw, pathname) => async (req, res, next) => {
            var _a;
            const { path, handler, regex } = mw;
            let params;
            try {
                params = regex ? getURLParams(regex, pathname) : {};
            }
            catch (e) {
                console.error(e);
                if (e instanceof URIError)
                    return res.sendStatus(400);
                throw e;
            }
            // Warning: users should not use :wild as a pattern
            let prefix = path;
            if (regex) {
                for (const key of regex.keys) {
                    if (key === 'wild') {
                        prefix = prefix.replace('*', params.wild);
                    }
                    else {
                        prefix = prefix.replace(`:${key}`, params[key]);
                    }
                }
            }
            req.params = { ...req.params, ...params };
            if (mw.type === 'mw') {
                req.url = lead(req.originalUrl.substring(prefix.length));
                req.baseUrl = trail(req.originalUrl.substring(0, prefix.length));
            }
            if (!req.path)
                req.path = pathname;
            if ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.enableReqRoute)
                req.route = mw;
            await applyHandler(handler)(req, res, next);
        };
        let idx = 0;
        const loop = () => {
            req.originalUrl = req.baseUrl + req.url;
            const pathname = getPathname(req.url);
            const matched = __classPrivateFieldGet(this, _App_instances, "m", _App_find).call(this, pathname).filter((x) => (req.method === 'HEAD' || (x.method ? x.method === req.method : true)) && !mw.includes(x));
            if (matched.length && matched[0] !== null) {
                if (idx !== 0) {
                    idx = mw.length;
                    req.params = {};
                }
                mw = [
                    ...mw,
                    ...matched,
                    {
                        type: 'mw',
                        handler: (req, res, next) => {
                            if (req.method === 'HEAD') {
                                res.statusCode = 204;
                                return res.end('');
                            }
                            next();
                        },
                        path: '/'
                    }
                ];
            }
            else if (this.parent == null) {
                mw.push({
                    handler: this.noMatchHandler,
                    type: 'route',
                    path: '/'
                });
            }
            void handle(mw[idx++], pathname)(req, res, next);
        };
        const parentNext = next;
        next = (err) => {
            if (err != null) {
                // @ts-expect-error The 'this' context of type 'this' is not assignable to method's 'this' of type 'App<Request, Response<unknown>>' ts(2345)
                return this.onError(err, req, res);
            }
            if (res.writableEnded)
                return;
            if (idx >= mw.length) {
                if (parentNext != null)
                    parentNext();
                return;
            }
            loop();
        };
        loop();
    }
    /**
     * Creates HTTP server and dispatches middleware
     * @param port server listening port
     * @param cb callback to be invoked after server starts listening
     * @param host server listening host
     */
    listen(port, cb, host) {
        return createServer().on('request', this.attach).listen(port, host, cb);
    }
}
_App_instances = new WeakSet(), _App_find = function _App_find(url) {
    return this.middleware.filter((m) => {
        m.regex = m.regex || rg(m.path, m.type === 'mw');
        let fullPathRegex;
        m.fullPath && typeof m.fullPath === 'string'
            ? (fullPathRegex = rg(m.fullPath, m.type === 'mw'))
            : (fullPathRegex = null);
        return m.regex.pattern.test(url) && (m.type === 'mw' && fullPathRegex ? fullPathRegex.pattern.test(url) : true);
    });
};
//# sourceMappingURL=app.js.map