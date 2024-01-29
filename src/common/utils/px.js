export const numberToPx = (val) => {
  return typeof val === "number" ? `${val}px` : val;
};

export const pxToNumber = (value) => {
  if (!value) return 0;
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
};
