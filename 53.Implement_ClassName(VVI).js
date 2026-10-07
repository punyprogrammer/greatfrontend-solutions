export default function classNames(...args) {
  const out = [];

  const walk = (input) => {
    if (!input) return; // 0, "", null, undefined, NaN, false
    if (typeof input === "string" || typeof input === "number") {
      out.push(String(input));
    } else if (Array.isArray(input)) {
      input.forEach((item) => walk(item));
    } else if (typeof input === "object") {
      for (const [key, val] of Object.entries(input)) {
        if (val) out.push(key);
      }
    }
  };

  args.forEach((arg) => walk(arg));
  return out.join(" ");
}
