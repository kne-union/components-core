import useUrlFilter from './useUrlFilter';
import {createUrlFilterReader} from './filterToUrlParams';

/**
 * 从 URL 参数初始化 Filter 状态的 hook（简化版）。
 *
 * 基于 useUrlFilter 封装，使用 createUrlFilterReader 解析 filterParams[key] 格式的 URL 参数，
 * 自动解析 label:value 格式，支持单选和多选。
 *
 * @param {string[]|Object} mapping - URL 参数映射
 *   - 数组: ['tenantOrgId', 'orgName']，默认单选，自动创建 { name: key, value: { label, value } }
 *   - 对象:
 *     - 值为 true: 单选，使用默认转换 { name: key, value: { label, value } }
 *     - 值为 { multi: true }: 多选，value 为 [{ label, value }, ...] 数组
 *     - 值为函数: 自定义转换，接收解析后的值（单选为 { label, value }，多选为数组），返回 filter 项或 null/falsy 跳过
 * @returns {[Array, Function]} - [filter, setFilter]
 *
 * @example
 * // 数组形式（默认单选）
 * const [filter, setFilter] = useUrlFilterValue(['keyword', 'status']);
 * // URL: ?filterParams[keyword]=前端开发&filterParams[status]=招聘中:active
 * // → filter: [
 * //     { name: 'keyword', value: { label: '前端开发', value: '前端开发' } },
 * //     { name: 'status', value: { label: '招聘中', value: 'active' } }
 * //   ]
 *
 * @example
 * // 对象形式（多选 + 自定义）
 * const [filter, setFilter] = useUrlFilterValue({
 *   keyword: true,
 *   city: { multi: true },
 *   status: (parsed) => parsed ? { name: 'status', value: parsed } : null
 * });
 * // URL: ?filterParams[keyword]=测试&filterParams[city]=上海:010,北京:020
 * // → keyword: { label: '测试', value: '测试' }
 * // → city: [{ label: '上海', value: '010' }, { label: '北京', value: '020' }]
 */
const useUrlFilterValue = (mapping) => {
    const normalizedMapping = Array.isArray(mapping)
        ? mapping.reduce((acc, item) => {
            const key = typeof item === 'string' ? item : item.name;
            acc[key] = typeof item === 'string' ? true : item;
            return acc;
        }, {})
        : mapping;

    return useUrlFilter({
        readUrlParams: (searchParams) => {
            const {takeFilterEntry, getConsumedKeys} = createUrlFilterReader(searchParams);
            const data = {};
            Object.entries(normalizedMapping).forEach(([key, config]) => {
                const multi = typeof config === 'object' && config !== null && config.multi;
                const val = takeFilterEntry(key, {multi});
                if (val !== null) data[key] = val;
            });
            return {consumedKeys: getConsumedKeys(), ...data};
        },
        buildFilter: (data) => {
            const {consumedKeys, ...values} = data;
            const filters = [];
            Object.entries(normalizedMapping).forEach(([key, config]) => {
                if (values[key] === undefined) return;
                const parsedValue = values[key];
                if (typeof config === 'function') {
                    const result = config(parsedValue);
                    if (result) filters.push(result);
                } else {
                    const label = typeof config === 'object' && config !== null ? config.label : key;
                    filters.push({name: key, label, value: parsedValue});
                }
            });
            return filters;
        }
    });
};

export default useUrlFilterValue;
