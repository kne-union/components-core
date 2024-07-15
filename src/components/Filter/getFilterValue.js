import transform from "lodash/transform";

const getFilterValue = (filterValue) => {
  return transform(
    filterValue,
    (result, { name, value }) => {
      result[name] = Array.isArray(value)
        ? value.map(({ value }) => value)
        : value?.value;
    },
    {}
  );
};

export default getFilterValue;
