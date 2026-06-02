import {useState, useRef, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

/**
 * 创建 URL 参数读取器，自动追踪已消费的参数 key。
 *
 * @param {URLSearchParams} searchParams - React Router 的 searchParams 对象
 * @returns {{ take: (key: string) => string|null, getConsumedKeys: () => string[] }}
 *
 * @example
 * const { take, getConsumedKeys } = createUrlParamsReader(searchParams);
 * const orgId = take('tenantOrgId');
 * const orgName = take('orgName');
 * // getConsumedKeys() => ['tenantOrgId', 'orgName']
 */
export const createUrlParamsReader = (searchParams) => {
    const consumedKeys = [];
    const take = (key) => {
        if (!searchParams.has(key)) return null;
        consumedKeys.push(key);
        return searchParams.get(key);
    };
    const getConsumedKeys = () => consumedKeys;
    return {take, getConsumedKeys};
};

/**
 * 从 URL 参数中移除已消费的 key，返回新的 URLSearchParams 或 null（无变化时）。
 *
 * @param {URLSearchParams} searchParams - 当前 URL 参数
 * @param {string[]} consumedKeys - 需要移除的 key 列表
 * @returns {URLSearchParams|null}
 */
export const stripConsumedUrlParams = (searchParams, consumedKeys) => {
    if (!consumedKeys?.length) return null;
    const next = new URLSearchParams(searchParams);
    let changed = false;
    consumedKeys.forEach(key => {
        if (next.has(key)) {
            next.delete(key);
            changed = true;
        }
    });
    return changed ? next : null;
};

/**
 * 从 URL 参数初始化 Filter 状态的 hook。
 *
 * 读取 URL 参数构建初始筛选值，并在挂载后自动清除已消费的 URL 参数。
 *
 * @param {Object} options
 * @param {Function} options.readUrlParams - 读取 URL 参数并返回 { consumedKeys: string[], ...data }
 * @param {Function} options.buildFilter - 接收 readUrlParams 的返回值，构建初始 filter 数组
 * @returns {[Array, Function]} - [filter, setFilter]
 *
 * @example
 * const [filter, setFilter] = useUrlFilter({
 *   readUrlParams: (searchParams) => {
 *     const { take, getConsumedKeys } = createUrlParamsReader(searchParams);
 *     const orgId = take('tenantOrgId');
 *     return { consumedKeys: getConsumedKeys(), orgId };
 *   },
 *   buildFilter: ({ orgId }) => [
 *     { name: 'status', value: { label: '开启', value: 'open' } },
 *     ...(orgId ? [{ name: 'tenantOrgId', value: { label: orgId, value: orgId } }] : [])
 *   ]
 * });
 */
const useUrlFilter = ({readUrlParams, buildFilter}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlFilterSnapshotRef = useRef(null);

    if (urlFilterSnapshotRef.current === null) {
        urlFilterSnapshotRef.current = readUrlParams(searchParams);
    }

    const [filter, setFilter] = useState(() => buildFilter(urlFilterSnapshotRef.current));

    const urlStrippedRef = useRef(false);
    useEffect(() => {
        if (urlStrippedRef.current) return;
        urlStrippedRef.current = true;
        const nextParams = stripConsumedUrlParams(searchParams, urlFilterSnapshotRef.current?.consumedKeys);
        if (nextParams) {
            setSearchParams(nextParams, {replace: true});
        }
    }, [searchParams, setSearchParams]);

    return [filter, setFilter];
};

export default useUrlFilter;
