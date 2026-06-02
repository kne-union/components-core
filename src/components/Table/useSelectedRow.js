import {useState} from 'react';

const useSelectedRow = (options) => {
    const {rowKey} = Object.assign({}, {rowKey: 'id'}, options);
    const [selectedRows, setSelectedRows] = useState([]);

    const getRowId = (item) => typeof rowKey === 'function' ? rowKey(item) : item[rowKey];
    const selectedRowKeys = selectedRows.map(getRowId);

    return {
        type: 'checkbox', selectedRowKeys, selectedRows, onSelectAll: (type, selected, items) => {
            const ids = items.map(getRowId);
            if (type) {
                setSelectedRows(value => {
                    const existingKeys = value.map(getRowId);
                    return [...value, ...items.filter(item => existingKeys.indexOf(getRowId(item)) === -1)];
                });
            } else {
                setSelectedRows(value => {
                    return value.filter(item => {
                        return ids.indexOf(getRowId(item)) === -1;
                    });
                });
            }
        }, onSelect: (item, type) => {
            if (type) {
                setSelectedRows(value => {
                    const newValue = value.slice(0);
                    newValue.push(item);
                    return newValue;
                });
            } else {
                setSelectedRows(value => {
                    const newValue = value.slice(0);
                    const index = newValue.findIndex(row => getRowId(row) === getRowId(item));
                    if (index > -1) {
                        newValue.splice(index, 1);
                    }
                    return newValue;
                });
            }
        }, setSelectedRows, clearSelectedRows: () => {
            setSelectedRows([]);
        }
    };
};

export default useSelectedRow;