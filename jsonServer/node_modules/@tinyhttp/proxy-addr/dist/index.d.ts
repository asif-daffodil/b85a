import { IncomingMessage } from 'node:http';
import { IPv6, IPv4 } from 'ipaddr.js';

type Req = Pick<IncomingMessage, 'headers' | 'socket'>;
export type TrustParameter = string | number | string[];
export type TrustFunction = (addr: string, i: number) => boolean;
export type Trust = TrustFunction | TrustParameter;
type Subnet = {
    ip: IPv4 | IPv6;
    range: number;
};
/**
 * Get all addresses in the request, optionally stopping
 * at the first untrusted.
 *
 * @param req
 * @param trust
 */
declare function alladdrs(req: Req, trust?: Trust): string[];
/**
 * Compile argument into trust function.
 *
 * @param  val
 */
declare function compile(val: string | number | string[]): (addr: string, i: number) => boolean;
/**
 * Parse IP notation string into range subnet.
 *
 * @param {String} note
 * @private
 */
export declare function parseIPNotation(note: string): Subnet;
/**
 * Determine address of proxied request.
 *
 * @param req
 * @param trust
 * @public
 */
export declare function proxyaddr(req: Req, trust: Trust): string;
export { alladdrs as all };
export { compile };
//# sourceMappingURL=index.d.ts.map