import { Cacher } from "./storage.ts";
import { compile } from "./compile.ts";
import { compileBody, compileToString } from "./compile-string.ts";
import { parse } from "./parse.ts";
import { render, renderAsync, renderString, renderStringAsync } from "./render.ts";
import { EtaError, RuntimeErr } from "./err.ts";
import { TemplateFunction } from "./compile.ts";
import type { EtaConfig, Options } from "./config.ts";
export declare class Eta {
    constructor(customConfig?: Partial<EtaConfig>);
    config: EtaConfig;
    RuntimeErr: typeof RuntimeErr;
    compile: typeof compile;
    compileToString: typeof compileToString;
    compileBody: typeof compileBody;
    parse: typeof parse;
    render: typeof render;
    renderAsync: typeof renderAsync;
    renderString: typeof renderString;
    renderStringAsync: typeof renderStringAsync;
    filepathCache: Record<string, string>;
    templatesSync: Cacher<TemplateFunction>;
    templatesAsync: Cacher<TemplateFunction>;
    resolvePath: null | ((this: Eta, template: string, options?: Partial<Options>) => string);
    readFile: null | ((this: Eta, path: string) => string);
    configure(customConfig: Partial<EtaConfig>): void;
    withConfig(customConfig: Partial<EtaConfig>): this & {
        config: EtaConfig;
    };
    loadTemplate(name: string, template: string | TemplateFunction, // template string or template function
    options?: {
        async: boolean;
    }): void;
}
export { EtaError };
//# sourceMappingURL=core.d.ts.map