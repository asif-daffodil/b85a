import { type IncomingMessage as Req, type ServerResponse as Res } from 'node:http';
type next = (err?: any) => void;
export declare const redirect: <Request extends Req = Req, Response extends Res = Res<Req>, Next extends next = next>(req: Request, res: Response, next: Next) => (url: string, status?: number) => Response;
export {};
//# sourceMappingURL=redirect.d.ts.map