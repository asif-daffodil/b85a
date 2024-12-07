import { all, compile, proxyaddr as proxyAddr } from '@tinyhttp/proxy-addr';
import { isIP } from 'node:net';
export { getURLParams } from '@tinyhttp/req';
const trustRemoteAddress = ({ socket }, trust) => {
    const val = socket.remoteAddress;
    if (typeof trust !== 'function')
        trust = compile(trust);
    return trust(val, 0);
};
export const getProtocol = (req, trust) => {
    const proto = `http${req.secure ? 's' : ''}`;
    if (!trustRemoteAddress(req, trust))
        return proto;
    const header = req.headers['X-Forwarded-Proto'] || proto;
    const index = header.indexOf(',');
    return index !== -1 ? header.substring(0, index).trim() : header.trim();
};
const normalizeHostString = (host) => decodeURIComponent(host).toLowerCase().normalize();
const getAuthorityHeaderHostString = (req) => {
    const authority = req.get(':authority');
    if (Array.isArray(authority))
        return undefined;
    if (Array.isArray(authority) || !authority)
        return undefined;
    const index = authority.indexOf('@');
    if (index === -1)
        return normalizeHostString(authority);
    return normalizeHostString(authority.substring(index + 1));
};
const getForwardedHeaderHostString = (req) => {
    const forwardedHost = req.get('x-forwarded-host');
    if (Array.isArray(forwardedHost))
        return undefined;
    if (!forwardedHost)
        return undefined;
    return normalizeHostString(forwardedHost);
};
const getDefaultHeaderHostString = (req) => {
    const host = req.get('host');
    if (!host || host.indexOf(',') !== -1)
        return undefined;
    if (host.indexOf(',') !== -1)
        return undefined;
    return normalizeHostString(host);
};
const getHostString = (req, trust) => {
    var _a;
    if (trustRemoteAddress(req, trust)) {
        const forwardedHost = getForwardedHeaderHostString(req);
        if (forwardedHost)
            return forwardedHost;
    }
    const authorityHost = getAuthorityHeaderHostString(req);
    const defaultHost = getDefaultHeaderHostString(req);
    if (authorityHost && defaultHost) {
        if (authorityHost !== defaultHost)
            throw new Error('Request `:authority` pseudo-header does not agree with `Host` header');
        return authorityHost;
    }
    return (_a = authorityHost !== null && authorityHost !== void 0 ? authorityHost : defaultHost) !== null && _a !== void 0 ? _a : undefined;
};
export const getHost = (req, trust) => {
    const host = getHostString(req, trust);
    if (!host)
        return undefined;
    // IPv6 literal support
    const index = host.indexOf(':', host[0] === '[' ? host.indexOf(']') + 1 : 0);
    if (index === -1)
        return { hostname: host };
    const hostname = host.substring(0, index);
    const port = Number(host.substring(index + 1));
    if (Number.isNaN(port))
        throw new TypeError('Port number is NaN, therefore Host is malformed');
    return { hostname, port };
};
export const getIP = (req, trust) => proxyAddr(req, trust).replace(/^.*:/, ''); // striping the redundant prefix addeded by OS to IPv4 address
export const getIPs = (req, trust) => all(req, trust);
export const getSubdomains = (req, trust, subdomainOffset = 2) => {
    const host = getHost(req, trust);
    if (!(host === null || host === void 0 ? void 0 : host.hostname))
        return [];
    const subdomains = isIP(host.hostname) ? [host.hostname] : host.hostname.split('.').reverse();
    return subdomains.slice(subdomainOffset);
};
//# sourceMappingURL=request.js.map