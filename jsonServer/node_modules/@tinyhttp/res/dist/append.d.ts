import type { ServerResponse as Res } from 'node:http';
export declare const append: <Response extends Res = Res<import("http").IncomingMessage>>(res: Response) => (field: string, value: string | number | string[]) => Response;
//# sourceMappingURL=append.d.ts.map