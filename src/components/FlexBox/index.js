import useResize from "@common/hooks/useResize";
import last from "lodash/last";
import { useRef, useState } from "react";
import { List } from "antd";
import Fetch from "@kne/react-fetch";
import isEqual from "lodash/isEqual";
import classnames from "classnames";

const defaultColumns = [
  {
    width: 786,
    col: 1,
    size: 15,
  },
  {
    width: 960,
    col: 2,
    size: 12,
  },
  {
    width: 1360,
    col: 3,
    size: 12,
  },
  {
    width: 1680,
    col: 4,
    size: 12,
  },
  {
    width: 1920,
    col: 5,
    size: 15,
  },
];

export const useFlexBox = (props) => {
  const { columns, onChange } = Object.assign(
    {},
    { columns: defaultColumns },
    props
  );
  const [column, setColumn] = useState(null);
  const columnRef = useRef(null);
  const ref = useResize((el) => {
    const width = el.clientWidth;
    const column =
      columns.find((item, index) => {
        return item.width >= width;
      }) || last(columns);
    if (!isEqual(column, columnRef.current)) {
      setColumn(column);
      columnRef.current && onChange && onChange(column);
      columnRef.current = column;
    }
  });

  return { ref, column };
};

const FlexBox = ({ columns, outerClassName, gutter, ...props }) => {
  const { ref, column } = useFlexBox({ columns });
  return (
    <div ref={ref} className={outerClassName}>
      {column && (
        <List
          {...props}
          grid={{
            gutter,
            column: column.col,
          }}
        />
      )}
    </div>
  );
};

FlexBox.defaultProps = {
  gutter: 16,
  columns: defaultColumns,
};

FlexBox.Item = List.Item;

const FlexBoxFetch = (
  {
    columns,
    api,
    getFetchApi,
    outerClassName,
    className,
    gutter,
    dataFormat,
    ...props
  },
  forwardRef
) => {
  const { ref, column } = useFlexBox({ columns });
  return (
    <div ref={ref} className={outerClassName}>
      {column && (
        <Fetch
          {...(api || getFetchApi(column))}
          ref={forwardRef}
          render={({ data, isComplete }) => {
            return (
              <List
                {...props}
                className={classnames(className, "loading-container", {
                  "is-loading": !isComplete,
                })}
                dataSource={dataFormat(data)}
                grid={{
                  gutter,
                  column: column.col,
                }}
              />
            );
          }}
        />
      )}
    </div>
  );
};

FlexBoxFetch.defaultProps = {
  gutter: 16,
  columns: defaultColumns,
  dataFormat: (data) => {
    return data.pageData;
  },
};

FlexBox.Fetch = FlexBoxFetch;

export default FlexBox;
