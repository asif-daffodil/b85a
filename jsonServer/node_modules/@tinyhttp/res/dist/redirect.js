import { STATUS_CODES } from 'node:http';
import { escapeHTML } from 'es-escape-html';
import { formatResponse } from './format.js';
import { setLocationHeader } from './headers.js';
export const redirect = (req, res, next) => (url, status) => {
    let address = url;
    status = status || 302;
    let body = '';
    address = setLocationHeader(req, res)(address).getHeader('Location');
    formatResponse(req, res, next)({
        text: () => {
            body = `${STATUS_CODES[status]}. Redirecting to ${address}`;
        },
        html: () => {
            const u = escapeHTML(address);
            body = `<p>${STATUS_CODES[status]}. Redirecting to <a href="${u}">${u}</a></p>`;
        },
        default: () => {
            body = '';
        }
    });
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.statusCode = status;
    if (req.method === 'HEAD')
        res.end();
    else
        res.end(body);
    return res;
};
//# sourceMappingURL=redirect.js.map