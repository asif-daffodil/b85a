import type { App } from './app.js';
import type { Handler } from './index.js';
import type { TemplateEngineOptions } from './types.js';
/**
 * Extends Request and Response objects with custom properties and methods
 */
export declare const extendMiddleware: <EngineOptions extends TemplateEngineOptions = TemplateEngineOptions>(app: App) => Handler;
//# sourceMappingURL=extend.d.ts.map