import { vary } from '@tinyhttp/vary';
const isIterable = (obj) => typeof obj[Symbol.iterator] === 'function';
const failOriginParam = () => {
    throw new TypeError('No other objects allowed. Allowed types is array of strings or RegExp');
};
const getOriginHeaderHandler = (origin) => {
    if (typeof origin === 'boolean') {
        return origin
            ? (_, res) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            : () => undefined;
    }
    if (typeof origin === 'string') {
        return (_, res) => {
            res.setHeader('Access-Control-Allow-Origin', origin);
        };
    }
    if (typeof origin === 'function') {
        return (req, res) => {
            vary(res, 'Origin');
            res.setHeader('Access-Control-Allow-Origin', origin(req, res));
        };
    }
    if (typeof origin !== 'object')
        failOriginParam();
    if (isIterable(origin)) {
        const originArray = Array.from(origin);
        if (originArray.some((element) => typeof element !== 'string'))
            failOriginParam();
        const originSet = new Set(origin);
        if (originSet.has('*')) {
            return (_, res) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
            };
        }
        return (req, res) => {
            vary(res, 'Origin');
            if (req.headers.origin === undefined)
                return;
            if (!originSet.has(req.headers.origin))
                return;
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        };
    }
    if (origin instanceof RegExp) {
        return (req, res) => {
            vary(res, 'Origin');
            if (req.headers.origin === undefined)
                return;
            if (!origin.test(req.headers.origin))
                return;
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        };
    }
    failOriginParam();
};
/**
 * CORS Middleware
 */
export const cors = (opts = {}) => {
    const { origin = '*', methods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], allowedHeaders = ['content-type'], exposedHeaders, credentials, maxAge, optionsSuccessStatus = 204, preflightContinue = false } = opts;
    const originHeaderHandler = getOriginHeaderHandler(origin);
    return (req, res, next) => {
        var _a, _b;
        originHeaderHandler(req, res);
        // Setting the Access-Control-Allow-Methods header from the methods array
        res.setHeader('Access-Control-Allow-Methods', methods.join(', ').toUpperCase());
        // Setting the Access-Control-Allow-Headers header
        if (allowedHeaders)
            res.setHeader('Access-Control-Allow-Headers', allowedHeaders);
        // Setting the Access-Control-Expose-Headers header
        if (exposedHeaders)
            res.setHeader('Access-Control-Expose-Headers', exposedHeaders);
        // Setting the Access-Control-Allow-Credentials header
        if (credentials)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        // Setting the Access-Control-Max-Age header
        if (maxAge)
            res.setHeader('Access-Control-Max-Age', maxAge);
        if (((_b = (_a = req.method) === null || _a === void 0 ? void 0 : _a.toUpperCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === 'OPTIONS') {
            if (preflightContinue) {
                next === null || next === void 0 ? void 0 : next();
            }
            else {
                res.statusCode = optionsSuccessStatus;
                res.setHeader('Content-Length', '0');
                res.end();
            }
        }
        else {
            next === null || next === void 0 ? void 0 : next();
        }
    };
};
