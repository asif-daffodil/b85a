import type { IncomingMessage as Req, ServerResponse as Res } from 'node:http';
export type FormatProps = {
    default?: () => void;
} & Record<string, any>;
export type FormatError = Error & {
    status: number;
    statusCode: number;
    types: string[];
};
type next = (err?: FormatError) => void;
export declare const formatResponse: <Request extends Req = Req, Response extends Res = Res<Req>, Next extends next = next>(req: Request, res: Response, next: Next) => (obj: FormatProps) => Response;
export {};
//# sourceMappingURL=format.d.ts.map