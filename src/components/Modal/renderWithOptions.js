const renderWithOptions = (footer, options) => {
  if (typeof footer === "function") {
    return footer(options);
  }
  return footer;
};

export default renderWithOptions;
