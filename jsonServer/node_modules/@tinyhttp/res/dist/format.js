import { getAccepts } from '@tinyhttp/req';
import { setVaryHeader } from './headers.js';
import { normalizeType, normalizeTypes } from './util.js';
export const formatResponse = (req, res, next) => (obj) => {
    const fn = obj.default;
    if (fn)
        obj.default = undefined;
    const keys = Object.keys(obj);
    const key = keys.length > 0 ? getAccepts(req)(...keys) : false;
    setVaryHeader(res)('Accept');
    if (key) {
        res.setHeader('Content-Type', normalizeType(key).value);
        obj[key](req, res, next);
    }
    else if (fn) {
        fn();
    }
    else {
        const err = new Error('Not Acceptable');
        err.status = err.statusCode = 406;
        err.types = normalizeTypes(keys).map((o) => o.value);
        next(err);
    }
    return res;
};
//# sourceMappingURL=format.js.map