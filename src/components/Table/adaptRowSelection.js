const adaptRowSelection = (rowSelection, { dataSource = [], rowKey = 'id', context } = {}) => {
  if (!rowSelection) {
    return undefined;
  }

  if (typeof rowSelection.onChange === 'function') {
    return rowSelection;
  }

  if (typeof rowSelection.onSelect !== 'function' && typeof rowSelection.onSelectAll !== 'function') {
    return rowSelection;
  }

  const getRowId = item => (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]);

  return {
    type: rowSelection.type || 'checkbox',
    selectedRowKeys: rowSelection.selectedRowKeys || [],
    onChange: (selectedRowKeys, currentKey, meta = {}) => {
      const { checked } = meta;

      if (currentKey === undefined) {
        if (typeof rowSelection.onSelectAll === 'function') {
          rowSelection.onSelectAll(!!checked, !!checked, dataSource);
        }
        return;
      }

      const row = (dataSource || []).find(item => getRowId(item) === currentKey);
      if (row && typeof rowSelection.onSelect === 'function') {
        rowSelection.onSelect(row, checked);
      }
    },
    context
  };
};

export default adaptRowSelection;
