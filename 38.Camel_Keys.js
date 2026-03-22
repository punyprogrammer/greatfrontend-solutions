/**
 * @param Object
 * @return Object
 */
export default function camelCaseKeys(object) {
  // if there is a _ then convert to camelCase
  if (typeof object !== "object" || object === null) return object;
  // Array handling
  if (Array.isArray(object)) {
    return object.map((item) => camelCaseKeys(item));
  }
  const cloned = {};
  // iterate the keys of the object
  for (let key in object) {
    // if not camel case then convert
    if (key.includes("_")) {
      const splits = key.split("_");
      // make sure we convert to lowerCase the first split 
      // make sure we convert to upperCase the second split 
      const modifiedKey =
        splits[0][0]?.toLocaleLowerCase() +
        splits[0].slice(1) +
        splits[1][0].toUpperCase() +
        splits[1].slice(1);
      cloned[modifiedKey] = camelCaseKeys(object[key]);
    } else {
      cloned[key] = camelCaseKeys(object[key]);
    }
  }
  return cloned;
}
