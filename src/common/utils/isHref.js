const isHref = (value) => {
  const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return value ? reg.test(value) : false;
};

export default isHref;
