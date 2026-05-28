/**
 * 将筛选值数组序列化为 URLSearchParams，保留 label 信息以便反序列化还原完整筛选状态。
 *
 * 序列化格式（使用冒号分隔 label 和 value，逗号分隔多值）：
 * - 单值且 label === value：prefix[name]=value（如输入框）
 * - 单值且 label !== value：prefix[name]=label:value
 * - 多值：prefix[name]=label1:value1,label2:value2
 *
 * @param {Array} filterValue - 筛选值数组，格式为 [{ name, label, value }, ...]
 * @param {Object} [options] - 选项
 * @param {string} [options.prefix='filterParams'] - URL 参数前缀，设为空字符串则不加前缀
 * @returns {URLSearchParams}
 *
 * @example
 * const params = filterToUrlParams([
 *   { name: 'keyword', label: '关键词', value: { label: '测试', value: '测试' } },
 *   { name: 'city', label: '城市', value: [{ label: '上海', value: '010' }, { label: '北京', value: '020' }] },
 *   { name: 'status', label: '状态', value: { label: '启用', value: 'active' } },
 * ]);
 * // params.toString() => 'filterParams[keyword]=测试&filterParams[city]=上海:010,北京:020&filterParams[status]=启用:active'
 *
 * // 自定义前缀
 * filterToUrlParams(filterValue, { prefix: 'f' })
 * // => 'f[keyword]=测试&f[city]=上海:010,北京:020'
 *
 * // 无前缀（直接平铺）
 * filterToUrlParams(filterValue, { prefix: '' })
 * // => 'keyword=测试&city=上海:010,北京:020'
 */
const filterToUrlParams = (filterValue, { prefix = 'filterParams' } = {}) => {
  const params = new URLSearchParams();

  if (!Array.isArray(filterValue)) return params;

  filterValue.forEach(({ name, value }) => {
    if (value == null || value === '') return;

    const key = prefix ? `${prefix}[${name}]` : name;

    if (Array.isArray(value)) {
      if (value.length === 0) return;
      const serialized = value
        .map((item) => serializeEntry(item))
        .filter(Boolean)
        .join(',');
      if (serialized) params.set(key, serialized);
    } else {
      const serialized = serializeEntry(value);
      if (serialized) params.set(key, serialized);
    }
  });

  return params;
};

/**
 * 序列化单个筛选值项。
 * - label === value 时返回 value（简化格式）
 * - 否则返回 label:value
 */
const serializeEntry = (item) => {
  if (item == null) return null;
  if (typeof item !== 'object') return String(item);

  const label = item.label ?? item.name;
  const value = item.value ?? item.id;

  if (value == null || value === '') return null;
  if (label === value) return String(value);
  return `${label}:${value}`;
};

/**
 * 解析 URL 参数中的单个筛选值项，反序列化为 { label, value } 对象。
 * 与 filterToUrlParams 配合使用。
 *
 * 解析规则：
 * - 无冒号：label 和 value 相同，如 "测试" → { label: '测试', value: '测试' }
 * - 有冒号：冒号前为 label，冒号后为 value，如 "启用:active" → { label: '启用', value: 'active' }
 *
 * @param {string} str - URL 参数中的原始字符串
 * @returns {{ label: string, value: string }}
 *
 * @example
 * parseFilterEntry('测试')
 * // => { label: '测试', value: '测试' }
 *
 * parseFilterEntry('启用:active')
 * // => { label: '启用', value: 'active' }
 */
const parseFilterEntry = (str) => {
  const colonIndex = str.indexOf(':');
  if (colonIndex === -1) {
    return { label: str, value: str };
  }
  return {
    label: str.slice(0, colonIndex),
    value: str.slice(colonIndex + 1),
  };
};

/**
 * 从 URL 参数中读取筛选值项，返回单选 { label, value } 或多选数组。
 *
 * @param {URLSearchParams} searchParams - URL 参数对象
 * @param {string} key - 参数名（不含前缀）
 * @param {Object} [options] - 选项
 * @param {boolean} [options.multi=false] - 是否多选，多选返回数组
 * @param {string} [options.prefix='filterParams'] - URL 参数前缀，设为空字符串则不加前缀
 * @returns {{ label: string, value: string } | { label: string, value: string }[] | null}
 *
 * @example
 * // URL: ?filterParams[city]=上海:010,北京:020&filterParams[status]=启用:active
 * takeFilterEntry(searchParams, 'city', { multi: true })
 * // => [{ label: '上海', value: '010' }, { label: '北京', value: '020' }]
 *
 * // 无前缀
 * takeFilterEntry(searchParams, 'keyword', { prefix: '' })
 * // => { label: '测试', value: '测试' }
 */
const takeFilterEntry = (searchParams, key, { multi = false, prefix = 'filterParams' } = {}) => {
  const fullKey = prefix ? `${prefix}[${key}]` : key;
  if (!searchParams.has(fullKey)) return null;

  const raw = searchParams.get(fullKey);
  if (!raw) return null;

  if (multi) {
    return raw.split(',').map(parseFilterEntry);
  }

  // 单选时，如果包含逗号，只取第一个
  const firstEntry = raw.includes(',') ? raw.split(',')[0] : raw;
  return parseFilterEntry(firstEntry);
};

/**
 * 创建 URL 筛选参数读取器，自动追踪已消费的参数 key。
 * 配合 useUrlFilter 使用，readUrlParams 返回的 consumedKeys 可被自动清除。
 *
 * @param {URLSearchParams} searchParams - React Router 的 searchParams 对象
 * @param {Object} [options] - 选项
 * @param {string} [options.prefix='filterParams'] - URL 参数前缀
 * @returns {{ takeFilterEntry, getConsumedKeys }}
 *
 * @example
 * const { takeFilterEntry, getConsumedKeys } = createUrlFilterReader(searchParams);
 * const keyword = takeFilterEntry('keyword');
 * const city = takeFilterEntry('city', { multi: true });
 * const status = takeFilterEntry('status');
 * // getConsumedKeys() => ['filterParams[keyword]', 'filterParams[city]', 'filterParams[status]']
 *
 * // 配合 useUrlFilter 使用
 * const [filter, setFilter] = useUrlFilter({
 *   readUrlParams: (searchParams) => {
 *     const { takeFilterEntry, getConsumedKeys } = createUrlFilterReader(searchParams);
 *     const keyword = takeFilterEntry('keyword');
 *     const city = takeFilterEntry('city', { multi: true });
 *     return { consumedKeys: getConsumedKeys(), keyword, city };
 *   },
 *   buildFilter: ({ keyword, city }) => [
 *     ...(keyword ? [{ name: 'keyword', label: '关键词', value: keyword }] : []),
 *     ...(city ? [{ name: 'city', label: '城市', value: city }] : []),
 *   ],
 * });
 */
const createUrlFilterReader = (searchParams, { prefix = 'filterParams' } = {}) => {
  const consumedKeys = [];

  const takeFilterEntry = (key, { multi = false } = {}) => {
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    if (!searchParams.has(fullKey)) return null;

    consumedKeys.push(fullKey);
    const raw = searchParams.get(fullKey);
    if (!raw) return null;

    if (multi) {
      return raw.split(',').map(parseFilterEntry);
    }

    const firstEntry = raw.includes(',') ? raw.split(',')[0] : raw;
    return parseFilterEntry(firstEntry);
  };

  const getConsumedKeys = () => consumedKeys;

  return { takeFilterEntry, getConsumedKeys };
};

export default filterToUrlParams;
export { parseFilterEntry, takeFilterEntry, createUrlFilterReader };
