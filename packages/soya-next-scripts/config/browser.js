/* global __SOYA_CONFIG__ */
let checkMutability = true;

/**
 * Underlying get mechanism
 *
 * @private
 * @method getImpl
 * @param object {object} - Object to get the property for
 * @param property {string | array[string]} - The property name to get (as an array or '.' delimited string)
 * @return value {*} - Property value, including undefined if not defined.
 */
const getImpl = (object, property) => {
  const elems = Array.isArray(property) ? property : property.split('.');
  const name = elems[0];
  const value = object[name];
  if (elems.length <= 1) {
    return value;
  }
  // Note that typeof null === 'object'
  if (value === null || typeof value !== 'object') {
    return undefined;
  }
  return getImpl(value, elems.slice(1));
};

const isObject = obj => (obj !== null && typeof obj === 'object' && !Array.isArray(obj));

const makeImmutable = (object, property, value) => {
  let properties = null;

  // Backwards compatibility mode where property/value can be specified
  if (typeof property === 'string') {
    return Object.defineProperty(object, property, {
      value: (typeof value === 'undefined') ? object[property] : value,
      writable: false,
      configurable: false
    });
  }

  // Get the list of properties to work with
  if (Array.isArray(property)) {
    properties = property;
  } else {
    properties = Object.keys(object);
  }

  // Process each property
  for (let i = 0; i < properties.length; i++) {
    const propertyName = properties[i];
    const value = object[propertyName];

    Object.defineProperty(object, propertyName, {
      value,
      writable: false,
      configurable: false
    });

    // Call recursively if an object.
    if (isObject(value)) {
      makeImmutable(value);
    }
  }

  return object;
};

export default Object.assign({}, __SOYA_CONFIG__, {
  get(property) {
    if (property === null || property === undefined) {
      throw new Error("Calling config.get with null or undefined argument");
    }
    const value = getImpl(__SOYA_CONFIG__, property);

    // Produce an exception if the property doesn't exist
    if (value === undefined) {
      throw new Error(`Configuration property "${property}" is not defined`);
    }

    // Make configurations immutable after first get (unless disabled)
    if (checkMutability) {
      if (!(process.env.ALLOW_CONFIG_MUTATIONS || false)) {
        makeImmutable(__SOYA_CONFIG__);
      }
      checkMutability = false;
    }

    // Return the value
    return value;
  },
  has(property) {
    // While get() throws an exception for undefined input, has() is designed to test validity, so false is appropriate
    if (property === null || property === undefined) {
      return false;
    }
    return (getImpl(__SOYA_CONFIG__, property) !== undefined);
  },
});
