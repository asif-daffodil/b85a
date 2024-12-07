import type { ServerResponse as S } from 'node:http';
type Res = Pick<S, 'setHeader' | 'end' | 'removeHeader'>;
/**
 * Respond with stringified JSON object
 * @param res Response
 */
export declare const json: <Response extends Res = Res>(res: Response) => (body: any, ...args: any[]) => Response;
export {};
//# sourceMappingURL=json.d.ts.map