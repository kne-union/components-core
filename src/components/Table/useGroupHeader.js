import { useMemo } from "react";

const useGroupHeader = (columns) => {
  return useMemo(() => {
    const groupHeaderColumns = columns.filter(
      (item) => item.groupHeader && item.groupHeader.length > 0
    );
    if (groupHeaderColumns.length > 0) {
      const newColumns = columns.slice(0);
      const group = [];
      const appendGroupHeader = (column) => {
        const { groupHeader } = column;
        if (!(groupHeader && groupHeader.length > 0)) {
          return;
        }
        const columnIndex = newColumns.indexOf(column);
        const core = (groupHeader, group) => {
          const [targetHeader, ...otherHeader] = groupHeader;
          let currentGroup = group.find(
            (item) => item.name === targetHeader.name
          );
          if (!currentGroup) {
            currentGroup = Object.assign(
              { startIndex: columnIndex },
              targetHeader,
              { children: [] }
            );
            group.push(currentGroup);
          }
          if (otherHeader.length > 0) {
            core(otherHeader, currentGroup.children);
          } else {
            currentGroup.children.push(column);
          }
        };
        core(groupHeader, group);
        newColumns.splice(columnIndex, 1);
      };
      groupHeaderColumns.forEach(appendGroupHeader);
      group.forEach((groupColumn, index) => {
        newColumns.splice(groupColumn.startIndex + index, 0, groupColumn);
      });

      return { columns: newColumns, hasGroupHeader: true };
    }
    return { columns, hasGroupHeader: false };
  }, [columns]);
};

export default useGroupHeader;
