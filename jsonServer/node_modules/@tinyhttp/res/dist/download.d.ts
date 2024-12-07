import type { IncomingMessage as Req, ServerResponse as Res } from 'node:http';
import type { SendFileOptions } from '@tinyhttp/send';
export type DownloadOptions = SendFileOptions & Partial<{
    headers: Record<string, string>;
}>;
type Callback = (err?: any) => void;
export declare const download: <Request extends Req = Req, Response extends Res = Res<Req>>(req: Request, res: Response) => (path: string, filename?: string | Callback, options?: DownloadOptions | Callback, cb?: Callback) => Response;
export declare const attachment: <Response extends Res>(res: Response) => (filename?: string) => Response;
export {};
//# sourceMappingURL=download.d.ts.map