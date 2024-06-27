import SelectInnerInput from "@common/components/SelectInnerInput";
import { useEffect, useMemo, useRef, useState } from "react";
import useRefCallback from "@kne/use-ref-callback";
import { Checkbox, List, Menu, message, Space, Spin } from "antd";
import Icon from "@components/Icon";
import SearchInput from "@common/components/SearchInput";
import createTreeUtils from "./createTreeUtils";
import get from "lodash/get";
import last from "lodash/last";
import isEqual from "lodash/isEqual";
import SimpleBar from "@common/components/SimpleBar";
import classnames from "classnames";
import style from "./style.module.scss";
import { withFetch } from "@kne/react-fetch";
import { useIntl } from "@components/Intl";
import commonStyle from "@common/components/SelectInnerInput/common.module.scss";

const useSelectInnerContext = SelectInnerInput.useContext;

const SearchInner = withFetch(({ data, computedIsChecked, onSelect }) => {
  return (
    <SimpleBar className={style["scroll-plus-box"]}>
      <List
        className={commonStyle["list"]}
        size="small"
        dataSource={data}
        rowKey="value"
        renderItem={(item) => {
          const checked = computedIsChecked(item);
          return (
            <List.Item
              className={classnames(commonStyle["list-item"], {
                [commonStyle["is-selected"]]: checked,
              })}
              onClick={() => onSelect(item, checked)}
            >
              <span className={commonStyle["item-label"]}>{item.label}</span>
            </List.Item>
          );
        }}
      />
    </SimpleBar>
  );
});
const CascaderInner = ({ value, setValue, size, selectLevel }) => {
  const { fetchApi, props } = useSelectInnerContext();
  const [searchText, setSearchText] = useState("");
  const dataFormat = useRefCallback(props.dataFormat);
  const { formatMessage } = useIntl({ moduleName: "Common" });
  const fetchData = fetchApi.data;
  const mapping = useMemo(() => {
    return new Map(
      dataFormat(fetchData).list.map((item) => [item.value, item])
    );
  }, [fetchData, dataFormat]);

  const treeUtils = useMemo(() => {
    return createTreeUtils(mapping);
  }, [mapping]);

  const loadMorePropsRef = useRef({});
  loadMorePropsRef.current = {
    createMergeTree: props.createMergeTree,
    loadMore: fetchApi.loadMore,
    openLoadData: props.openLoadData,
    parentIdKey: props.parentIdKey,
    treeUtils,
  };
  const [selectedIds, setSelectedIds] = useState(() => {
    const initValue = value.find((id) => {
      return !!mapping.get(id);
    });

    return treeUtils.getSelectedQueue(
      initValue ||
        get(
          fetchApi.data.find(
            (item) => item.children && item.children.length > 0
          ),
          "id"
        ) ||
        get(fetchApi.data, "[0].id"),
      mapping
    );
  });

  useEffect(() => {
    const { openLoadData, loadMore, parentIdKey, createMergeTree, treeUtils } =
      loadMorePropsRef.current;
    if (!openLoadData) {
      return;
    }

    const lastNode = mapping.get(last(selectedIds));

    if (!lastNode) {
      return;
    }

    const nextSelectedIds = treeUtils.getSelectedQueue(lastNode.id);

    if (!isEqual(selectedIds, nextSelectedIds)) {
      setSelectedIds(nextSelectedIds);
      return;
    }

    if (lastNode.hasOwnProperty("children")) {
      return;
    }

    loadMore(
      {
        data: {
          [parentIdKey]: lastNode.id,
        },
      },
      createMergeTree(lastNode.id)
    );
  }, [selectedIds, mapping]);

  const onCheckedChange = (checked, id) => {
    const newValue = (() => {
      if (props.onlyAllowLastLevel && checked) {
        const newValue = value.slice(0);
        newValue.push(id);
        return newValue;
      }
      if (props.onlyAllowLastLevel) {
        const newValue = value.slice(0);
        newValue.splice(value.indexOf(id), 1);
        return newValue;
      }
      return checked
        ? treeUtils.setNodeChecked(id, value)
        : treeUtils.setNodeUnchecked(id, value);
    })();
    if (newValue.length > size) {
      message.error(formatMessage({ id: "maxSelectedCount" }, { count: size }));
      return;
    }
    setValue(props.single && newValue.length > 0 ? [last(newValue)] : newValue);
  };

  const isNotLastNode = (id) => {
    const node = mapping.get(id);
    if (props.openLoadData && !node.hasOwnProperty("children")) {
      return true;
    }
    return node.children && node.children.length > 0;
  };

  const hasSearch = !props.openLoadData && typeof props.onSearch === "function";

  const searchInner = hasSearch && searchText && (
    <SearchInner
      data={{ searchText }}
      loader={({ data }) => {
        return props.onSearch(data.searchText, { mapping });
      }}
      computedIsChecked={(item) => value.indexOf(item.id) > -1}
      onSelect={(item, checked) => {
        onCheckedChange(!checked, item.id);
        !checked &&
          setSelectedIds(treeUtils.getSelectedQueue(item.id, mapping));
        setSearchText("");
      }}
    />
  );

  return (
    <div
      className={classnames(style["content"], {
        [style["is-popup"]]: props.isPopup,
        [style["has-search"]]: hasSearch,
      })}
      style={{
        "--menu-item-width": props.menuItemWidth,
      }}
    >
      {hasSearch && (
        <SearchInput
          isPopup={props.isPopup}
          className={classnames(commonStyle["search-input"], {
            [commonStyle["is-popup"]]: props.isPopup,
          })}
          placeholder={
            props.searchPlaceholder || formatMessage({ id: "search" })
          }
          value={searchText}
          onSearch={(value) => {
            setSearchText(value);
          }}
        />
      )}
      {searchInner || (
        <div>
          <SimpleBar
            className={style["scroller"]}
            options={{ autoHide: false }}
          >
            <div className={style["columns"]}>
              {selectedIds.map((selectedId, index) => {
                const selectNode = mapping.get(selectedId);
                const list = treeUtils.getSiblingNode(selectedId);
                const itemNotLastNode =
                  !isNotLastNode(selectNode?.id) && index > 0;
                return (
                  <SimpleBar
                    key={get(list, "[0].id", index)}
                    className={classnames(style["content-item"], {
                      [style["last-level-area"]]: itemNotLastNode,
                    })}
                  >
                    {itemNotLastNode ? (
                      <Space wrap>
                        {list.map((node) => {
                          return (
                            <Checkbox
                              {...treeUtils.computedCheckboxStatus(
                                node.id,
                                value
                              )}
                              disabled={
                                selectLevel > 1 &&
                                (value.indexOf(node.parentCode) > -1 ||
                                  value.indexOf(node.code.slice(0, 3)) > -1)
                              }
                              key={node.id}
                              onChange={(e) =>
                                onCheckedChange(e.target.checked, node.id)
                              }
                            >
                              {node.label}
                            </Checkbox>
                          );
                        })}
                      </Space>
                    ) : (
                      <Menu
                        className={classnames(style["menu"])}
                        onSelect={(item) => {
                          const node = mapping.get(item.key);
                          if (!node) {
                            return;
                          }
                          if (isNotLastNode(node.id)) {
                            setSelectedIds(
                              treeUtils.getSelectedQueue(node.id, mapping)
                            );
                          } else {
                            const { checked } =
                              treeUtils.computedCheckboxStatus(node.id, value);
                            onCheckedChange(!checked, node.id);
                          }
                        }}
                        selectedKeys={
                          index === selectedIds.length - 1 ? [] : selectedIds
                        }
                        items={list.map((node) => {
                          return {
                            key: node.id,
                            label: (
                              <Space
                                className={classnames(style["menu-item"], {
                                  [style["checkbox-hidden"]]:
                                    props.onlyAllowLastLevel &&
                                    isNotLastNode(node.id),
                                })}
                              >
                                {!props.onlyAllowLastLevel && (
                                  <Checkbox
                                    {...treeUtils.computedCheckboxStatus(
                                      node.id,
                                      value
                                    )}
                                    disabled={
                                      selectLevel > 1 &&
                                      value.indexOf(node.parentCode) > -1
                                    }
                                    onChange={(e) =>
                                      onCheckedChange(e.target.checked, node.id)
                                    }
                                  />
                                )}
                                <div className={style["menu-label"]}>
                                  {node.label}
                                </div>
                                {isNotLastNode(node.id) && (
                                  <Icon
                                    className={style["menu-item-icon"]}
                                    type="icon-arrow-thin-right"
                                    size={12}
                                  />
                                )}
                              </Space>
                            ),
                          };
                        })}
                      />
                    )}
                  </SimpleBar>
                );
              })}
              {!fetchApi.isComplete ? (
                <div className={style["loading"]}>
                  <Spin size="small" />
                </div>
              ) : null}
            </div>
          </SimpleBar>
        </div>
      )}
    </div>
  );
};

const CascaderField = ({ maxLength, nodeFormat, dataFormat, ...props }) => {
  return (
    <SelectInnerInput
      {...props}
      dataFormat={(data) => {
        return dataFormat(data, nodeFormat);
      }}
    >
      {({ value, setValue }) => {
        return (
          <CascaderInner
            {...props}
            size={maxLength}
            value={value}
            setValue={setValue}
          />
        );
      }}
    </SelectInnerInput>
  );
};

CascaderField.defaultProps = {
  maxLength: Number.MAX_VALUE,
  size: "middle",
  isPopup: true,
  overlayWidth: "460px",
  menuItemWidth: "180px",
  openLoadData: false,
  onlyAllowLastLevel: false,
  parentIdKey: "id",
  onSearch: (searchText, { mapping }) => {
    return Array.from(mapping.values()).filter((item) => {
      return item.label.indexOf(searchText) > -1;
    });
  },
  dataFormat: (data, nodeFormat) => {
    const core = (data, parentId) => {
      const output = [];
      output.push(
        ...(data || []).map((item) => {
          if (typeof nodeFormat === "function") {
            Object.assign(item, nodeFormat(item));
          }
          if (item.children && item.children.length > 0) {
            output.push(...core(item.children, item.id));
          }
          return Object.assign({}, item, { value: item.id, parentId });
        })
      );
      return output;
    };
    return {
      list: core(data, null),
    };
  },
  createMergeTree: (parentId) => (data, newData) => {
    const core = (data) => {
      return data.map((node) => {
        if (node.id === parentId) {
          return Object.assign({}, node, {
            children:
              newData &&
              newData.map((item) => {
                return Object.assign({}, item, { parentId });
              }),
          });
        }
        if (Array.isArray(node.children) && node.children.length > 0) {
          return Object.assign({}, node, { children: core(node.children) });
        }

        return node;
      });
    };
    return core(data);
  },
};

export { createTreeUtils };
export default CascaderField;
export { default as DataEnum } from "./DataEnum";
