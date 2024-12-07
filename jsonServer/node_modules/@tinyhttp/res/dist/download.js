import { basename, extname, resolve } from 'node:path';
import { contentDisposition } from '@tinyhttp/content-disposition';
import { sendFile } from '@tinyhttp/send';
import { setContentType, setHeader } from './headers.js';
export const download = (req, res) => (path, filename, options, cb) => {
    let done = cb;
    let name = filename;
    let opts = (options || null);
    // support function as second or third arg
    if (typeof filename === 'function') {
        done = filename;
        name = null;
    }
    else if (typeof options === 'function') {
        done = options;
        opts = null;
    }
    // set Content-Disposition when file is sent
    const headers = {
        'Content-Disposition': contentDisposition(name || basename(path))
    };
    // merge user-provided headers
    if (opts === null || opts === void 0 ? void 0 : opts.headers) {
        for (const key of Object.keys(opts.headers)) {
            if (key.toLowerCase() !== 'content-disposition')
                headers[key] = opts.headers[key];
        }
    }
    // merge user-provided options
    opts = { ...opts, headers };
    // send file
    return sendFile(req, res)(opts.root ? path : resolve(path), opts, done || (() => undefined));
};
export const attachment = (res) => (filename) => {
    if (filename) {
        setContentType(res)(extname(filename));
        filename = basename(filename);
    }
    setHeader(res)('Content-Disposition', contentDisposition(filename));
    return res;
};
//# sourceMappingURL=download.js.map