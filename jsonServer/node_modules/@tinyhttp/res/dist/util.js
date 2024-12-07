import mime from 'mime';
export function acceptParams(str, index) {
    const parts = str.split(/ *; */);
    const ret = { value: parts[0], quality: 1, params: {}, originalIndex: index };
    for (const part of parts) {
        const pms = part.split(/ *= */);
        if ('q' === pms[0])
            ret.quality = Number.parseFloat(pms[1]);
        else
            ret.params[pms[0]] = pms[1];
    }
    return ret;
}
export const normalizeType = (type) => ~type.indexOf('/') ? acceptParams(type) : { value: mime.getType(type), params: {} };
export function normalizeTypes(types) {
    const ret = [];
    for (const type of types) {
        ret.push(normalizeType(type));
    }
    return ret;
}
//# sourceMappingURL=util.js.map