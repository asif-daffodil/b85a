import type { NextFunction } from '@tinyhttp/router';
import type { App } from './app.js';
import type { Request } from './request.js';
import type { Response } from './response.js';
export type ErrorHandler = (this: App, err: any, req: Request, res: Response, next?: NextFunction) => void;
export declare const onErrorHandler: ErrorHandler;
//# sourceMappingURL=onError.d.ts.map