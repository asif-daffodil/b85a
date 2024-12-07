import type { IncomingMessage as Request, ServerResponse as Response } from 'node:http';
export interface AccessControlOptions {
    origin?: string | boolean | ((req: Request, res: Response) => string) | Iterable<string> | RegExp;
    methods?: string[];
    allowedHeaders?: string[];
    exposedHeaders?: string[];
    credentials?: boolean;
    maxAge?: number;
    optionsSuccessStatus?: number;
    preflightContinue?: boolean;
}
/**
 * CORS Middleware
 */
export declare const cors: (opts?: AccessControlOptions) => (req: Request, res: Response, next?: () => void) => void;
