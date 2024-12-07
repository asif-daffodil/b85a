import type { IncomingHttpHeaders, IncomingMessage } from 'node:http';
import type { ParsedUrlQuery } from 'node:querystring';
import { type Trust } from '@tinyhttp/proxy-addr';
import type { Options, Ranges } from 'header-range-parser';
import type { Middleware } from '@tinyhttp/router';
import type { App } from './app.js';
import type { Socket } from 'node:net';
import type { TLSSocket } from 'node:tls';
import type { URLParams } from '@tinyhttp/req';
export { getURLParams } from '@tinyhttp/req';
export type Host = {
    hostname: string;
    port?: number;
};
export declare const getProtocol: (req: Request, trust: Trust) => Protocol;
export declare const getHost: (req: Request, trust: Trust) => Host | undefined;
export declare const getIP: (req: Pick<Request, "headers" | "connection" | "socket">, trust: Trust) => string | undefined;
export declare const getIPs: (req: Pick<Request, "headers" | "connection" | "socket">, trust: Trust) => string[] | undefined;
export declare const getSubdomains: (req: Request, trust: Trust, subdomainOffset?: number) => string[];
export type Connection = IncomingMessage['socket'] & {
    encrypted: boolean;
};
export type Protocol = 'http' | 'https' | string;
export type { URLParams };
type AcceptsReturns = string | boolean | string[];
export interface Request extends IncomingMessage {
    originalUrl: string;
    path: string;
    url: string;
    baseUrl: string;
    query: ParsedUrlQuery;
    params: URLParams;
    connection: Connection;
    socket: TLSSocket | Socket;
    route?: Middleware;
    protocol: Protocol;
    secure: boolean;
    xhr: boolean;
    hostname?: string;
    port?: number;
    ip?: string;
    ips?: string[];
    subdomains?: string[];
    get: <HeaderName extends string>(header: HeaderName) => IncomingHttpHeaders[HeaderName];
    range: (size: number, options?: Options) => -1 | -2 | -3 | Ranges | undefined;
    accepts: (...types: string[]) => AcceptsReturns;
    acceptsEncodings: (...encodings: string[]) => AcceptsReturns;
    acceptsCharsets: (...charsets: string[]) => AcceptsReturns;
    acceptsLanguages: (...languages: string[]) => AcceptsReturns;
    is: (...types: string[]) => boolean;
    cookies?: any;
    signedCookies?: any;
    secret?: string | string[];
    fresh?: boolean;
    stale?: boolean;
    body?: any;
    app?: App;
}
//# sourceMappingURL=request.d.ts.map