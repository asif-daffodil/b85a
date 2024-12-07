import { forwarded } from "@tinyhttp/forwarded";
import ipaddr from "ipaddr.js";
const DIGIT_REGEXP = /^[0-9]+$/;
const isip = ipaddr.isValid;
const parseip = ipaddr.parse;
const IP_RANGES = {
  linklocal: ["169.254.0.0/16", "fe80::/10"],
  loopback: ["127.0.0.1/8", "::1/128"],
  uniquelocal: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "fc00::/7"]
};
function isIPRangeName(val) {
  return Object.prototype.hasOwnProperty.call(IP_RANGES, val);
}
const isIPv4 = (val) => val.kind() === "ipv4";
const isIPv6 = (val) => val.kind() === "ipv6";
const trustNone = () => false;
function alladdrs(req, trust) {
  const addrs = forwarded(req);
  if (trust == null) return addrs;
  if (typeof trust !== "function") trust = compile(trust);
  for (let i = 0; i < addrs.length - 1; i++) {
    if (trust(addrs[i], i)) continue;
    addrs.length = i + 1;
  }
  return addrs;
}
function compile(val) {
  let trust;
  if (typeof val === "string") trust = [val];
  else if (typeof val === "number") return compileHopsTrust(val);
  else if (Array.isArray(val)) trust = val.slice();
  else throw new TypeError("unsupported trust argument");
  for (let i = 0; i < trust.length; i++) {
    const element = trust[i];
    if (!isIPRangeName(element)) continue;
    const namedRange = IP_RANGES[element];
    trust.splice(i, 1, ...namedRange);
    i += namedRange.length - 1;
  }
  return compileTrust(compileRangeSubnets(trust));
}
function compileHopsTrust(hops) {
  return (_, i) => i < hops;
}
function compileRangeSubnets(arr) {
  return arr.map((ip) => parseIPNotation(ip));
}
function compileTrust(rangeSubnets) {
  const len = rangeSubnets.length;
  return len === 0 ? trustNone : len === 1 ? trustSingle(rangeSubnets[0]) : trustMulti(rangeSubnets);
}
function parseIPNotation(note) {
  const pos = note.lastIndexOf("/");
  const str = pos !== -1 ? note.substring(0, pos) : note;
  if (!isip(str)) throw new TypeError(`invalid IP address: ${str}`);
  let ip = parseip(str);
  const max = ip.kind() === "ipv6" ? 128 : 32;
  if (pos === -1) {
    if (isIPv6(ip) && ip.isIPv4MappedAddress()) ip = ip.toIPv4Address();
    return { ip, range: max };
  }
  const rangeString = note.substring(pos + 1, note.length);
  let range = null;
  if (DIGIT_REGEXP.test(rangeString)) range = Number.parseInt(rangeString, 10);
  else if (ip.kind() === "ipv4" && isip(rangeString)) range = parseNetmask(rangeString);
  if (range == null || range <= 0 || range > max) throw new TypeError(`invalid range on address: ${note}`);
  return { ip, range };
}
function parseNetmask(netmask) {
  const ip = parseip(netmask);
  return ip.kind() === "ipv4" ? ip.prefixLengthFromSubnetMask() : null;
}
function proxyaddr(req, trust) {
  const addrs = alladdrs(req, trust);
  return addrs[addrs.length - 1];
}
function trustMulti(subnets) {
  return function trust(addr) {
    if (!isip(addr)) return false;
    const ip = parseip(addr);
    let ipconv = null;
    const kind = ip.kind();
    for (let i = 0; i < subnets.length; i++) {
      const subnet = subnets[i];
      const subnetKind = subnet.ip.kind();
      let trusted = ip;
      if (kind !== subnetKind) {
        if (isIPv6(ip) && !ip.isIPv4MappedAddress()) continue;
        if (!ipconv) ipconv = isIPv4(ip) ? ip.toIPv4MappedAddress() : ip.toIPv4Address();
        trusted = ipconv;
      }
      if (trusted.match(subnet.ip, subnet.range)) return true;
    }
    return false;
  };
}
function trustSingle(subnet) {
  const subnetKind = subnet.ip.kind();
  const subnetIsIPv4 = subnetKind === "ipv4";
  return function trust(addr) {
    if (!isip(addr)) return false;
    let ip = parseip(addr);
    const kind = ip.kind();
    if (kind !== subnetKind) {
      if (subnetIsIPv4 && !ip.isIPv4MappedAddress()) return false;
      ip = subnetIsIPv4 ? ip.toIPv4Address() : ip.toIPv4MappedAddress();
    }
    return ip.match(subnet.ip, subnet.range);
  };
}
export {
  alladdrs as all,
  compile,
  parseIPNotation,
  proxyaddr
};
//# sourceMappingURL=index.js.map
