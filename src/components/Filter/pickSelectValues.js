/**
 * 从筛选值中提取原始值数组。
 * 支持：原始值、{ value } 对象、{ id } 对象、以及它们的数组。
 *
 * @example
 * pickSelectValues([{ value: 1 }, { id: 2 }, '3'])
 * // => ['1', '2', '3']
 *
 * pickSelectValues({ value: 'open' })
 * // => ['open']
 *
 * pickSelectValues(null)
 * // => []
 */
const pickSelectValues = value => {
  if (value == null || value === '') {
    return [];
  }
  const list = Array.isArray(value) ? value : [value];
  return list
    .map(item => {
      if (item == null) {
        return null;
      }
      if (typeof item !== 'object') {
        return String(item);
      }
      if (item.value != null && item.value !== '') {
        return String(item.value);
      }
      if (item.id != null && item.id !== '') {
        return String(item.id);
      }
      return null;
    })
    .filter(Boolean);
};

export default pickSelectValues;
