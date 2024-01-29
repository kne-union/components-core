import SelectInnerInput from "@common/components/SelectInnerInput";
import { useMemo, useRef, useState } from "react";
import useRefCallback from "@kne/use-ref-callback";
import style from "./style.module.scss";
import classnames from "classnames";
import { Space, Tree } from "antd";
import SearchInput from "@common/components/SearchInput";
import commonStyle from "@common/components/SelectInnerInput/common.module.scss";
import SimpleBar from "@common/components/SimpleBar";
import get from "lodash/get";
import omit from "lodash/omit";
import memoize from "lodash/memoize";

const useSelectInnerContext = SelectInnerInput.useContext;

const TreeFieldInner = ({ value: selected, setValue: setSelect, size }) => {
  const { fetchApi, props } = useSelectInnerContext();
  const [searchText, setSearchText] = useState("");
  const dataFormat = useRefCallback(props.dataFormat);
  const { single, isPopup, searchPlaceholder, ...others } = props;
  const fieldNamesRef = useRef(props.fieldNames);
  fieldNamesRef.current = props.fieldNames;
  const fetchData = fetchApi.data;
  const { treeData } = useMemo(
    () =>
      dataFormat(fetchData, {
        searchText,
        fieldNames: fieldNamesRef.current,
      }),
    [dataFormat, searchText, fetchData]
  );

  const searchTreeData = useMemo(() => {}, [
    treeData,
    searchText,
    props.fieldNames,
  ]);

  return (
    <Space direction="vertical" size={16}>
      {/*<SearchInput
          isPopup={isPopup}
          className={classnames(commonStyle["search-input"], {
            [commonStyle["is-popup"]]: isPopup,
          })}
          placeholder={searchPlaceholder}
          value={searchText}
          onSearch={(value) => {
            setSearchText(value);
          }}
        />*/}
      <SimpleBar
        className={classnames(style["scroll-loader"], {
          [style["is-popup"]]: props.isPopup,
        })}
      >
        <Tree
          {...omit(others, ["value", "valueType", "children", "dataFormat"])}
          size={size}
          checkable={!single}
          treeData={treeData}
          onCheck={setSelect}
          checkedKeys={selected}
          onSelect={
            single
              ? setSelect
              : (selectKeys) => {
                  const selectKey = selectKeys[0];
                  if (selectKey === void 0) {
                    return;
                  }
                  setSelect((current) => {
                    const newCurrent = current.slice(0);
                    const index = newCurrent.indexOf(selectKey);
                    if (index > -1) {
                      newCurrent.splice(index, 1);
                    } else {
                      newCurrent.push(selectKey);
                    }
                    return newCurrent;
                  });
                }
          }
          selectedKeys={single ? selected : undefined}
        />
      </SimpleBar>
    </Space>
  );
};

const TreeField = ({ maxLength, dataFormat, ...props }) => {
  return (
    <SelectInnerInput
      {...props}
      dataFormat={(data) => {
        return dataFormat(data, { fieldNames: props.fieldNames });
      }}
    >
      {({ value, setValue }) => {
        return (
          <TreeFieldInner size={maxLength} value={value} setValue={setValue} />
        );
      }}
    </SelectInnerInput>
  );
};

TreeField.defaultProps = {
  searchPlaceholder: "搜索",
  maxLength: Number.MAX_VALUE,
  size: "middle",
  isPopup: true,
  checkStrictly: false,
  dataFormat: (data, { fieldNames }) => {
    const treeToList = memoize((nodeList, { fieldNames }) => {
      const list = [];
      const core = (nodeList) => {
        if (!(Array.isArray(nodeList) && nodeList.length > 0)) {
          return;
        }
        nodeList.forEach((node) => {
          const value = node[get(fieldNames, "key", "key")],
            label = node[get(fieldNames, "title", "title")],
            children = node[get(fieldNames, "children", "children")];
          list.push({ id: value, value, label });
          core(children);
        });
      };
      core(nodeList);
      return list;
    });

    return {
      treeData: data,
      list: treeToList(data, { fieldNames }),
    };
  },
};

export default TreeField;
