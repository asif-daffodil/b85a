import { Accepts } from '@tinyhttp/accepts';
export const getAccepts = (req) => (...types) => new Accepts(req).types(types);
export const getAcceptsEncodings = (req) => (...encodings) => new Accepts(req).encodings(encodings);
export const getAcceptsCharsets = (req) => (...charsets) => new Accepts(req).charsets(charsets);
export const getAcceptsLanguages = (req) => (...languages) => new Accepts(req).languages(languages);
//# sourceMappingURL=accepts.js.map