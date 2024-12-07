import { parseRange } from 'header-range-parser';
import { typeIs } from '@tinyhttp/type-is';
import { fresh } from './fresh.js';
export * from './accepts.js';
export * from '@tinyhttp/url';
export const getRequestHeader = (req) => {
    return (header) => {
        const lc = header.toLowerCase();
        switch (lc) {
            case 'referer':
            case 'referrer':
                return (req.headers.referrer || req.headers.referer);
            default:
                return req.headers[lc];
        }
    };
};
export const getRangeFromHeader = (req) => (size, options) => {
    const range = getRequestHeader(req)('range');
    if (!range)
        return;
    return parseRange(size, range, options);
};
export const getFreshOrStale = (req, res) => {
    const method = req.method;
    const status = res.statusCode;
    // GET or HEAD for weak freshness validation only
    if (method !== 'GET' && method !== 'HEAD')
        return false;
    // 2xx or 304 as per rfc2616 14.26
    if ((status >= 200 && status < 300) || status === 304) {
        return fresh(req.headers, {
            etag: res.getHeader('ETag'),
            'last-modified': res.getHeader('Last-Modified')
        });
    }
    return false;
};
export const checkIfXMLHttpRequest = (req) => req.headers['x-requested-with'] === 'XMLHttpRequest';
export const reqIs = (req) => (...types) => typeIs(req.headers['content-type'], ...types);
//# sourceMappingURL=index.js.map