import type { OutgoingHttpHeaders } from 'node:http';
import type { IncomingMessage as Req, ServerResponse as Res } from 'node:http';
export declare const setHeader: <Response extends Res = Res<Req>>(res: Response) => (field: string | Record<string, string | number | string[]>, val?: string | number | readonly string[]) => Response;
export declare const setLocationHeader: <Request extends Req = Req, Response extends Res = Res<Req>>(req: Request, res: Response) => (url: string) => Response;
export declare const getResponseHeader: <Response extends Res = Res<Req>>(res: Response) => <HeaderName extends string>(field: HeaderName) => OutgoingHttpHeaders[HeaderName];
export declare const setLinksHeader: <Response extends Res = Res<Req>>(res: Response) => (links: {
    [key: string]: string;
}) => Response;
export declare const setVaryHeader: <Response extends Res = Res<Req>>(res: Response) => (field: string) => Response;
export declare const setContentType: <Response extends Res = Res<Req>>(res: Response) => (type: string) => Response;
//# sourceMappingURL=headers.d.ts.map