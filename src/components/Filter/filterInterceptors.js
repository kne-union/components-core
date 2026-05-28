const toIdName = item => {
    if (!item) {
        return null;
    }
    if (item.id != null) {
        return item;
    }
    if (item.value != null) {
        return {id: item.value, name: item.label};
    }
    return item;
};

const toLabelValue = item => {
    if (!item) {
        return null;
    }
    return {
        label: item.name ?? item.label,
        value: item.id ?? item.value
    };
};

/**
 * 单选 SuperSelect interceptor：{id, name} ↔ {label, value}
 * 适用于 valueKey="id" labelKey="name" 的单选场景
 */
export const singleSelectInterceptor = {
    input: value => {
        if (!value) {
            return value;
        }
        const item = Array.isArray(value) ? value[0] : value;
        const result = toIdName(item);
        return result;
    },
    output: selected => {
        if (!selected) {
            return selected;
        }
        const item = Array.isArray(selected) ? selected[0] : selected;
        return toLabelValue(item);
    }
};

/**
 * 多选 SuperSelect interceptor：[{id, name}] ↔ [{label, value}]
 * 适用于 valueKey="id" labelKey="name" 的多选场景
 */
export const multiSelectInterceptor = {
    input: value => {
        if (!value) {
            return value;
        }
        const list = Array.isArray(value) ? value : [value];
        return list.map(toIdName).filter(Boolean);
    },
    output: selected => {
        if (!selected) {
            return selected;
        }
        const list = Array.isArray(selected) ? selected : [selected];
        return list.map(toLabelValue).filter(Boolean);
    }
};

export default {single: singleSelectInterceptor, multi: multiSelectInterceptor};
