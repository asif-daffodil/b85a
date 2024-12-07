/* HELPER TYPES */
const METHODS = [
    'ACL',
    'BIND',
    'CHECKOUT',
    'CONNECT',
    'COPY',
    'DELETE',
    'GET',
    'HEAD',
    'LINK',
    'LOCK',
    'M-SEARCH',
    'MERGE',
    'MKACTIVITY',
    'MKCALENDAR',
    'MKCOL',
    'MOVE',
    'NOTIFY',
    'OPTIONS',
    'PATCH',
    'POST',
    'PRI',
    'PROPFIND',
    'PROPPATCH',
    'PURGE',
    'PUT',
    'REBIND',
    'REPORT',
    'SEARCH',
    'SOURCE',
    'SUBSCRIBE',
    'TRACE',
    'UNBIND',
    'UNLINK',
    'UNLOCK',
    'UNSUBSCRIBE'
];
/** HELPER METHODS */
const createMiddlewareFromRoute = ({ path, handler, fullPath, method }) => ({
    method,
    handler: handler || path,
    path: typeof path === 'string' ? path : '/',
    fullPath: typeof path === 'string' ? fullPath : path
});
/**
 * Push wares to a middleware array
 * @param mw Middleware arrays
 */
export const pushMiddleware = (mw) => ({ path, handler, method, handlers, type, fullPaths }) => {
    const m = createMiddlewareFromRoute({ path, handler, method, type, fullPath: fullPaths === null || fullPaths === void 0 ? void 0 : fullPaths[0] });
    let waresFromHandlers = [];
    let idx = 1;
    if (handlers) {
        waresFromHandlers = handlers.flat().map((handler) => createMiddlewareFromRoute({
            path,
            handler: handler,
            method,
            type,
            fullPath: fullPaths == null ? undefined : fullPaths[idx++]
        }));
    }
    for (const mdw of [m, ...waresFromHandlers])
        mw.push({ ...mdw, type });
};
/**
 * tinyhttp Router. Manages middleware and has HTTP methods aliases, e.g. `app.get`, `app.put`
 */
export class Router {
    constructor() {
        this.middleware = [];
        this.mountpath = '/';
        this.apps = {};
        for (const m of METHODS) {
            this[m.toLowerCase()] = this.add(m);
        }
    }
    add(method) {
        return (...args) => {
            const handlers = args.slice(1).flat();
            if (Array.isArray(args[0])) {
                for (const arg of Object.values(args[0])) {
                    if (typeof arg === 'string') {
                        pushMiddleware(this.middleware)({
                            path: arg,
                            handler: handlers[0],
                            handlers: handlers.slice(1),
                            method,
                            type: 'route'
                        });
                    }
                }
            }
            else {
                pushMiddleware(this.middleware)({
                    path: args[0],
                    handler: handlers[0],
                    handlers: handlers.slice(1),
                    method,
                    type: 'route'
                });
            }
            return this;
        };
    }
    msearch(...args) {
        const handlers = args.slice(1).flat();
        pushMiddleware(this.middleware)({
            path: args[0],
            handler: handlers[0],
            handlers: handlers.slice(1),
            method: 'M-SEARCH',
            type: 'route'
        });
        return this;
    }
    all(...args) {
        const handlers = args.slice(1).flat();
        pushMiddleware(this.middleware)({
            path: args[0],
            handler: handlers[0],
            handlers: handlers.slice(1),
            type: 'route'
        });
        return this;
    }
    /**
     * Push middleware to the stack
     */
    use(...args) {
        const base = args[0];
        const handlers = args.slice(1).flat();
        if (typeof base === 'string') {
            pushMiddleware(this.middleware)({
                path: base,
                handler: handlers[0],
                handlers: handlers.slice(1),
                type: 'mw'
            });
        }
        else {
            pushMiddleware(this.middleware)({
                path: '/',
                handler: Array.isArray(base) ? base[0] : base,
                handlers: Array.isArray(base)
                    ? [...base.slice(1), ...handlers]
                    : handlers,
                type: 'mw'
            });
        }
        return this;
    }
}
//# sourceMappingURL=index.js.map