import type { IncomingMessage as Req, ServerResponse as Res } from 'node:http';
import * as cookie from '@tinyhttp/cookie';
export declare const setCookie: <Request extends Req = Req, Response extends Res = Res<Req>>(req: Request & {
    secret?: string | string[];
}, res: Response) => (name: string, value: string | Record<string, unknown>, options?: cookie.SerializeOptions & Partial<{
    signed: boolean;
}>) => Response;
export declare const clearCookie: <Request extends Req = Req, Response extends Res = Res<Req>>(req: Request, res: Response) => (name: string, options?: cookie.SerializeOptions) => Response;
//# sourceMappingURL=cookie.d.ts.map