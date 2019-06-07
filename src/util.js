const crypto = require('crypto');

// Hash helper
const md5 = data =>
  crypto
    .createHash('md5')
    .update(data)
    .digest('hex');

// Content hash (values only, ordered as-is)
const uniqueId = object => md5(Object.values(object).join());

// Build an object from another object by selecting and possibly renaming keys
const rename = (object, projection) => {
  if (!object || !projection) return object;
  const clone = { ...object };
  Object.keys(projection).forEach(k => {
    if (object[k]) {
      clone[projection[k]] = object[k];
      delete clone[k];
    }
  });
  return clone;
};

// Build an object from another object by selecting and possibly renaming keys
const project = (object, projection) => {
  if (!object || !projection) return object;
  const clone = {};
  Object.keys(projection).forEach(k => {
    if (object[k]) {
      clone[projection[k]] = object[k];
    }
  });
  return clone;
};

// Create an object from another object by swapping its keys with its values
const invert = object => {
  const clone = {};
  Object.keys(object).forEach(k => {
    clone[object[k]] = k;
  });
  return clone;
};

// Cartesian (cross) product of N-arrays
const __f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(__f(a, b), ...c) : a);

// Flatten arbitrarily nested arrays into a single array
const flatten = arr => {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
};

// Add an element to a set indexed in a map (create, if first element)
const safeAddToMappedSet = ({ map, key, val }) => {
  const set = map[key] || new Set();
  set.add(val);
  map[key] = set;
  return set;
};

// Get the last segment of a path (a/b/c => c)
const lastPathSegment = path => {
  const parts = path.split('/');
  return parts[parts.length - 1];
};

module.exports = {
  cartesian,
  invert,
  flatten,
  lastPathSegment,
  md5,
  project,
  rename,
  safeAddToMappedSet,
  uniqueId
};
