import {useState} from 'react';
import uniq from "lodash/uniq";

const useSelectedRow = (options) => {
    const {rowKey} = Object.assign({}, {rowKey: 'id'}, options);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const getRowId = (item) => typeof rowKey === 'function' ? rowKey(item) : item[rowKey];

    return {
        type: 'checkbox', selectedRowKeys, onSelectAll: (type, selected, items) => {
            const ids = items.map(getRowId);
            if (type) {
                setSelectedRowKeys(value => {
                    return uniq([...value, ...ids]);
                });
            } else {
                setSelectedRowKeys(value => {
                    return value.filter(item => {
                        return ids.indexOf(item) === -1;
                    });
                });
            }
        }, onSelect: (item, type) => {
            if (type) {
                setSelectedRowKeys(value => {
                    const newValue = value.slice(0);
                    newValue.push(getRowId(item));
                    return newValue;
                });
            } else {
                setSelectedRowKeys(value => {
                    const newValue = value.slice(0);
                    newValue.splice(newValue.indexOf(getRowId(item)), 1);
                    return newValue;
                });
            }
        }, setSelectedRowKeys
    };
};

export default useSelectedRow;