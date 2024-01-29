import { withFetch } from "@kne/react-fetch";
import classnames from "classnames";
import style from "./style.module.scss";
import { get, omit, pick } from "lodash";
import { Table } from "@components/TablePage";
import { hooks } from "@kne/react-form-antd";
import useControlValue from "@kne/use-control-value";
import { useEffect, useRef } from "react";

const { useOnChange } = hooks;

const TableInner = withFetch(({ ...props }) => {
  const [value, onChange] = useControlValue(props);
  const fetchProps = [
    "isLoading",
    "isComplete",
    "data",
    "requestParams",
    "error",
    "send",
    "refresh",
    "reload",
    "loadMore",
    "setData",
  ];
  const fetchApi = pick(props, fetchProps);
  const tableProps = omit(props, fetchProps);
  const {
    rowKey = "id",
    columns,
    className,
    innerName,
    headerRender,
    footerRender,
  } = tableProps;
  const formatData = props.dataFormat(fetchApi.data);

  const handleChange = (list, value, { current, rowKeyValue, dataIndex }) => {
    const result = {};
    const dataList = list.slice(0).map((item) => {
      if (item[rowKey] === rowKeyValue) {
        result[item[rowKey]] = {
          ...item,
          [dataIndex]: current,
        };
        return {
          ...item,
          [dataIndex]: current,
        };
      } else {
        const _currentItem = value[item[rowKey]];
        result[item[rowKey]] = Object.assign({}, item, _currentItem);
        return Object.assign({}, item, _currentItem);
      }
    });
    const data = {
      pageData: dataList,
      totalCount: dataList.length,
    };
    fetchApi.setData(data);
    onChange && onChange(result);
  };

  const changeRef = useRef(null);
  changeRef.current = handleChange;

  useEffect(() => {
    // 判断value中是否全部存在list属性值
    const hasExist = formatData.list.every((x) => {
      const obj = value[x[rowKey]] || {};
      return Object.keys(x).every((it) => obj.hasOwnProperty(it));
    });
    if (
      (!hasExist || Object.keys(value).length !== formatData.list.length) &&
      fetchApi.isComplete
    ) {
      changeRef.current(formatData.list, value, {});
    }
  }, [fetchApi.isComplete, value, formatData.list, rowKey]);

  return (
    <div>
      {headerRender && headerRender(fetchApi)}
      <Table
        {...tableProps}
        className={classnames(style["table"], className)}
        rowKey={rowKey}
        dataSource={formatData.list}
        pagination={false}
        columns={columns.map((column) => {
          const item = { ...column };
          if (item.dataIndex) {
            return Object.assign({}, item, {
              render: (text, record, index) => {
                const editable = item.editable
                  ? typeof item.editable === "function"
                    ? item.editable(text, record, index, formatData.list)
                    : item.editable
                  : true;
                const rowKeyValue = record[rowKey];
                const valueItem = value[rowKeyValue];
                const defaultValue = get(valueItem, item.dataIndex) || text;
                if (editable && item.field) {
                  if (item.field?.render) {
                    return (
                      <>
                        {item.field.render(
                          {
                            value: defaultValue,
                            name: `${innerName}.${rowKeyValue}.${item.dataIndex}`,
                            label: " ",
                            labelHidden: item.labelHidden,
                            onChange: (...args) => {
                              const _value = item.field?.getValue
                                ? item.field.getValue(args[0])
                                : args[0];
                              handleChange(formatData.list, value, {
                                current: _value,
                                rowKeyValue,
                                dataIndex: item.dataIndex,
                              });
                              return (
                                item.field.onChange &&
                                item.field.onChange(...args, fetchApi)
                              );
                            },
                          },
                          record,
                          index,
                          fetchApi
                        )}
                      </>
                    );
                  }
                  const Component = item.field?.type;
                  return (
                    <Component
                      {...omit(item.field, ["type", "getValue"])}
                      value={defaultValue}
                      name={`${innerName}.${rowKeyValue}.${item.dataIndex}`}
                      label={" "}
                      labelHidden={item.labelHidden}
                      onChange={(...args) => {
                        const _value = item.field?.getValue
                          ? item.field.getValue(args[0])
                          : args[0];
                        handleChange(formatData.list, value, {
                          current: _value,
                          rowKeyValue,
                          dataIndex: item.dataIndex,
                        });
                        return (
                          item.field.onChange &&
                          item.field.onChange(...args, fetchApi)
                        );
                      }}
                    />
                  );
                } else {
                  return item.render
                    ? item.render(defaultValue, record, index)
                    : defaultValue;
                }
              },
            });
          }
          return item;
        })}
      />
      {footerRender && footerRender(fetchApi)}
    </div>
  );
});

TableInner.defaultProps = {
  mergeList: (data, newData) => {
    return Object.assign({}, newData, {
      pageData: (data.pageData || []).concat(newData.pageData || []),
    });
  },
  dataFormat: (data) => {
    return {
      list: data.pageData,
      total: data.totalCount,
    };
  },
};

const TableInputField = ({ api, ...props }) => {
  return <TableInner {...props} {...api} />;
};

TableInputField.defaultProps = {
  api: {},
  value: {},
};

const TableInput = (props) => {
  const render = useOnChange(
    Object.assign(
      {
        placeholder: `请选择${props.label}`,
        innerName: props.name,
      },
      props
    )
  );
  return render(TableInputField);
};

TableInput.Field = TableInputField;

export default TableInput;
