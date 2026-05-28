import pickSelectValues from './pickSelectValues';

/**
 * 声明式创建 mapFilterValue 函数。
 *
 * Filter.getFilterValue 默认只读取 { value }，而 SuperSelectFilterItem 等
 * 组件使用 { id, name } 格式，需要额外处理。此工具通过声明字段映射规则，
 * 自动生成符合 (filter, getFilterValue) => value 签名的函数。
 *
 * @param {Object} fieldMappers - 字段名到映射规则的映射
 * @param {'string'} fieldMappers[field] - 确保值为字符串类型
 * @param {'multi'} fieldMappers[field] - 多选，从 filter entry 提取值数组
 * @param {'single'} fieldMappers[field] - 单选，从 filter entry 提取第一个值
 * @param {Function} fieldMappers[field] - 自定义转换，接收 (rawValue, { entry, filter, value }) 返回新值
 *
 * @example
 * const mapFilterValue = createFilterValueMapper({
 *   id: 'string',
 *   roles: 'multi',
 *   tenantOrgId: 'single',
 *   status: (rawValue) => normalizeStatus(rawValue)
 * });
 *
 * // 使用方式与手写 mapFilterValue 一致
 * const filterValue = mapFilterValue(filter, Filter.getFilterValue);
 *
 * // 也可直接传给 BizUnit 的 options.mapFilterValue
 * <BizUnit options={{ mapFilterValue }} />
 */
const createFilterValueMapper = (fieldMappers) => {
  return (filter, getFilterValue) => {
    const value = getFilterValue(filter);

    Object.entries(fieldMappers).forEach(([fieldName, mapper]) => {
      const entry = filter.find(item => item.name === fieldName);

      if (mapper === 'string') {
        if (value[fieldName] != null && value[fieldName] !== '') {
          value[fieldName] = String(value[fieldName]);
        }
      } else if (mapper === 'multi') {
        if (entry) {
          const values = pickSelectValues(entry.value);
          if (values.length) {
            value[fieldName] = values;
          } else {
            delete value[fieldName];
          }
        }
      } else if (mapper === 'single') {
        if (entry) {
          const values = pickSelectValues(entry.value);
          if (values[0] != null) {
            value[fieldName] = values[0];
          } else {
            delete value[fieldName];
          }
        } else if (value[fieldName] != null && typeof value[fieldName] === 'object') {
          const values = pickSelectValues(value[fieldName]);
          if (values.length) {
            value[fieldName] = values[0];
          } else {
            delete value[fieldName];
          }
        }
      } else if (typeof mapper === 'function') {
        let rawValue = value[fieldName];
        if (rawValue != null && typeof rawValue === 'object' && 'value' in rawValue) {
          rawValue = rawValue.value;
        }
        if (rawValue != null && rawValue !== '') {
          const result = mapper(rawValue, { entry, filter, value });
          if (result != null && result !== '') {
            value[fieldName] = result;
          } else {
            delete value[fieldName];
          }
        }
      }
    });

    return value;
  };
};

export default createFilterValueMapper;
