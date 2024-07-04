const isColValueEmpty = (value, emptyOf) =>
  typeof emptyOf === "function"
    ? emptyOf(value)
    : (Array.isArray(value) && value.length === 0) ||
      (value &&
        typeof value === "object" &&
        Object.values(value).length === 0) ||
      value === "" ||
      value === void 0 ||
      value === null;

export default isColValueEmpty;
