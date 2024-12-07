import { encodeUrl } from '@tinyhttp/encode-url';
import { getRequestHeader } from '@tinyhttp/req';
import { vary } from '@tinyhttp/vary';
import mime from 'mime';
const charsetRegExp = /;\s*charset\s*=/;
export const setHeader = (res) => (field, val) => {
    if (typeof field === 'string') {
        let value = Array.isArray(val) ? val.map(String) : String(val);
        // add charset to content-type
        if (field.toLowerCase() === 'content-type') {
            if (Array.isArray(value)) {
                throw new TypeError('Content-Type cannot be set to an Array');
            }
            if (!charsetRegExp.test(value)) {
                const charset = 'UTF-8'; // UTF-8 is the default charset for all types
                if (typeof charset === 'string')
                    value += `; charset=${charset.toLowerCase()}`;
            }
        }
        res.setHeader(field, value);
    }
    else {
        for (const key in field) {
            setHeader(res)(key, field[key]);
        }
    }
    return res;
};
export const setLocationHeader = (req, res) => (url) => {
    let loc = url;
    // "back" is an alias for the referrer
    if (url === 'back')
        loc = getRequestHeader(req)('Referrer') || '/';
    // set location
    res.setHeader('Location', encodeUrl(loc));
    return res;
};
export const getResponseHeader = (res) => {
    return (field) => {
        return res.getHeader(field);
    };
};
export const setLinksHeader = (res) => (links) => {
    let link = res.getHeader('Link') || '';
    if (link)
        link += ', ';
    res.setHeader('Link', link +
        Object.keys(links)
            .map((rel) => `<${links[rel]}>; rel="${rel}"`)
            .join(', '));
    return res;
};
export const setVaryHeader = (res) => (field) => {
    vary(res, field);
    return res;
};
export const setContentType = (res) => (type) => {
    const ct = type.indexOf('/') === -1 ? mime.getType(type) : type;
    setHeader(res)('Content-Type', ct);
    return res;
};
//# sourceMappingURL=headers.js.map