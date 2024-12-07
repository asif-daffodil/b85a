import { STATUS_CODES } from 'node:http';
export const onErrorHandler = function (err, _req, res) {
    if (this.onError === onErrorHandler && this.parent)
        return this.parent.onError(err, _req, res);
    if (err instanceof Error)
        console.error(err);
    const code = err.code in STATUS_CODES ? err.code : err.status;
    if (typeof err === 'string' || Buffer.isBuffer(err))
        res.writeHead(500).end(err);
    else if (code in STATUS_CODES)
        res.writeHead(code).end(STATUS_CODES[code]);
    else
        res.writeHead(500).end(err.message);
};
//# sourceMappingURL=onError.js.map