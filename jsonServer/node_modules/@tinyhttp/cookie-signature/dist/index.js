import { createHmac, timingSafeEqual } from "node:crypto";
const sign = (val, secret) => `${val}.${createHmac("sha256", secret).update(val).digest("base64").replace(/=+$/, "")}`;
const unsign = (val, secret) => {
  const str = val.slice(0, val.lastIndexOf("."));
  const mac = sign(str, secret);
  const macBuffer = Buffer.from(mac);
  const valBuffer = Buffer.alloc(macBuffer.length);
  valBuffer.write(val);
  return timingSafeEqual(macBuffer, valBuffer) ? str : false;
};
export {
  sign,
  unsign
};
//# sourceMappingURL=index.js.map
