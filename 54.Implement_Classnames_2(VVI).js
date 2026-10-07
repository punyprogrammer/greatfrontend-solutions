/**
 * @typedef {Record<string, unknown>} ClassDictionary
 * @typedef {Array<ClassValue>} ClassArray
 * @typedef {string | number | null | boolean | undefined | (() => unknown) | ClassDictionary | ClassArray} ClassValue
 */

/**
 * @param {...ClassValue} args
 * @returns {string}
 */
export default function classNames(...args) {
  const out = [];

  const walk = (input) => {
    // special case for function 
    if(typeof input === 'function') return walk(input())
    if (!input) return; // 0, "", null, undefined, NaN, false
    if (typeof input === "string" || typeof input === "number") {
      // duplicate check 
      if(out.indexOf(input) < 0)
      {out.push(String(input));}
      
    } else if (Array.isArray(input)) {
      input.forEach((item) => walk(item));
    } else if (typeof input === "object") {
      for (const [key, val] of Object.entries(input)) {
         // duplicate check
        const valueIndex = out.indexOf(key);
        if (val && valueIndex < 0) out.push(key);
        // turn off scenario for objects and remove 
        if (!val && valueIndex >= 0){
          out.splice(valueIndex,1)

        }
      }
    }
  };

  args.forEach((arg) => walk(arg));
  return out.join(" ");
}
