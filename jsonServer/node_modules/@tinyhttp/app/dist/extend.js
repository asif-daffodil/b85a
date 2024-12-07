import { compile } from '@tinyhttp/proxy-addr';
import { checkIfXMLHttpRequest, getAccepts, getAcceptsCharsets, getAcceptsEncodings, getAcceptsLanguages, getFreshOrStale, getQueryParams, getRangeFromHeader, getRequestHeader } from '@tinyhttp/req';
import { append, attachment, clearCookie, download, formatResponse, getResponseHeader, json, redirect, send, sendFile, sendStatus, setContentType, setCookie, setHeader, setLinksHeader, setLocationHeader, setVaryHeader, status } from '@tinyhttp/res';
import { getSubdomains } from './request.js';
import { getHost, getIP, getIPs, getProtocol } from './request.js';
import { renderTemplate } from './response.js';
/**
 * Extends Request and Response objects with custom properties and methods
 */
export const extendMiddleware = (app) => ((req, res, next) => {
    const { settings } = app;
    res.get = getResponseHeader(res);
    req.get = getRequestHeader(req);
    if (settings === null || settings === void 0 ? void 0 : settings.bindAppToReqRes) {
        req.app = app;
        res.app = app;
    }
    if (settings === null || settings === void 0 ? void 0 : settings.networkExtensions) {
        let trust = settings === null || settings === void 0 ? void 0 : settings['trust proxy'];
        if (typeof trust !== 'function') {
            trust = compile(trust);
            settings['trust proxy'] = trust;
        }
        req.protocol = getProtocol(req, trust);
        req.secure = req.protocol === 'https';
        const host = getHost(req, trust);
        req.hostname = host === null || host === void 0 ? void 0 : host.hostname;
        req.port = host === null || host === void 0 ? void 0 : host.port;
        req.subdomains = getSubdomains(req, trust, settings.subdomainOffset);
        req.ip = getIP(req, trust);
        req.ips = getIPs(req, trust);
    }
    req.query = getQueryParams(req.url);
    req.range = getRangeFromHeader(req);
    req.accepts = getAccepts(req);
    req.acceptsCharsets = getAcceptsCharsets(req);
    req.acceptsEncodings = getAcceptsEncodings(req);
    req.acceptsLanguages = getAcceptsLanguages(req);
    req.xhr = checkIfXMLHttpRequest(req);
    res.header = res.set = setHeader(res);
    res.send = send(req, res);
    res.json = json(res);
    res.status = status(res);
    res.sendStatus = sendStatus(req, res);
    res.sendFile = sendFile(req, res);
    res.type = setContentType(res);
    res.location = setLocationHeader(req, res);
    res.links = setLinksHeader(res);
    res.vary = setVaryHeader(res);
    res.cookie = setCookie(req, res);
    res.clearCookie = clearCookie(req, res);
    res.render = renderTemplate(req, res, app);
    res.format = formatResponse(req, res, next);
    res.redirect = redirect(req, res, next);
    res.attachment = attachment(res);
    res.download = download(req, res);
    res.append = append(res);
    res.locals = res.locals || Object.create(null);
    Object.defineProperty(req, 'fresh', { get: getFreshOrStale.bind(null, req, res), configurable: true });
    req.stale = !req.fresh;
    next();
});
//# sourceMappingURL=extend.js.map