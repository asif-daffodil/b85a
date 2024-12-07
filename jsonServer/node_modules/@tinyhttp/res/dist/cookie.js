import * as cookie from '@tinyhttp/cookie';
import { sign } from '@tinyhttp/cookie-signature';
import { append } from './append.js';
export const setCookie = (req, res) => (name, value, options = {}) => {
    const secret = req.secret;
    const signed = options.signed || false;
    if (signed && !secret)
        throw new Error('cookieParser("secret") required for signed cookies');
    let val = typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);
    if (signed)
        val = `s:${sign(val, secret)}`;
    if (options.maxAge) {
        options.expires = new Date(Date.now() + options.maxAge);
        options.maxAge /= 1000;
    }
    if (options.path == null)
        options.path = '/';
    append(res)('Set-Cookie', `${cookie.serialize(name, String(val), options)}`);
    return res;
};
export const clearCookie = (req, res) => (name, options) => {
    return setCookie(req, res)(name, '', Object.assign({}, { expires: new Date(1), path: '/' }, options));
};
//# sourceMappingURL=cookie.js.map