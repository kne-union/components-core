import isEqualWith from "lodash/isEqualWith";

const isEqual = (value, other) => {
    return isEqualWith(value, other, (objValue, othValue) => {
        // 如果值是函数或 Symbol，认为相等（跳过比较）
        if (typeof objValue === 'function' || typeof othValue === 'function' || typeof objValue === 'symbol' || typeof othValue === 'symbol') {
            return true;
        }
        // 返回 undefined 让 lodash 使用默认比较
        return undefined;
    });
}

export default isEqual;