import style from "./style.module.scss";
import classnames from "classnames";
import { Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Permissions from "@components/Permissions";
import useControlValue from "@kne/use-control-value";
import Icon from "@components/Icon";
import { useCallback, useEffect, useMemo } from "react";
import ensureSlash from "@kne/ensure-slash";
import { useFetch } from "@kne/react-fetch";

const treeEnhance = (items) => {
  const childrenKeys = {},
    nodeMapping = [];
  const traversal = (children, options) => {
    const { parentKey, depth } = Object.assign(
      {
        parentKey: "root",
        depth: 0,
        paths: [],
      },
      options
    );
    if (!(Array.isArray(children) && children.length > 0)) {
      return null;
    }
    return children.map((item, index) => {
      const currentKey = `${
        item.key ||
        `${parentKey !== "root" ? `${parentKey}-` : ""}node-${index}`
      }`;
      if (!childrenKeys[parentKey]) {
        childrenKeys[parentKey] = [];
      }
      childrenKeys[parentKey].push(currentKey);
      const children = traversal(item.children, {
        parentKey: currentKey,
        depth: depth + 1,
      });
      childrenKeys[currentKey] &&
        childrenKeys[parentKey].push(...childrenKeys[currentKey]);
      const targetItem = Object.assign({}, item, {
        key: currentKey,
        parentKey,
        depth,
        children: children,
        originItem: item,
      });
      nodeMapping[currentKey] = targetItem;
      return targetItem;
    });
  };

  return { items: traversal(items), childrenKeys, nodeMapping };
};

const MenuItem = (props) => {
  const navigation = useNavigate();
  const {
    id,
    className,
    label,
    iconType,
    path,
    request,
    onClick,
    isOpen,
    isSelected,
    onOpenChange,
    children,
    fetchOptions,
    depth,
    onLoad,
    allowCollapsed,
  } = props;

  const hasChildren =
    (Array.isArray(children) && children.length > 0) || fetchOptions;
  const { refresh, isLoading } = useFetch(
    Object.assign({}, fetchOptions, {
      auto: !allowCollapsed && fetchOptions,
      onRequestSuccess: (data) => {
        onLoad(data);
      },
    })
  );

  const renderChildren = () => {
    if (!hasChildren) {
      return null;
    }
    if (!allowCollapsed || (isOpen && children)) {
      return <div className={style["children-list"]}>{children}</div>;
    }

    if (!allowCollapsed || (isOpen && isLoading)) {
      return (
        <div className={style["children-list"]}>
          <Spin className={style["loading"]} size="small" />
        </div>
      );
    }
  };
  return (
    <Permissions request={request}>
      <div className={classnames(className, style["menu-item"])}>
        <div
          className={classnames(style["title"], {
            [style["active"]]: isSelected,
            [style["has-children"]]: hasChildren,
            [style["no-collapse"]]: hasChildren && !allowCollapsed,
            [style["no-start-icon"]]: !iconType,
            [style["is-root"]]: depth === 0,
          })}
          onClick={(e) => {
            e.stopPropagation();
            if (!hasChildren && path) {
              navigation(path);
              return;
            }
            if (!hasChildren && !fetchOptions) {
              onClick?.(id, props);
              return;
            }
            if (!allowCollapsed) {
              return;
            }
            fetchOptions && refresh({});
            onOpenChange(!isOpen);
          }}
        >
          {iconType && <Icon type={iconType} />}
          <span className={style["title-content"]}>{label}</span>
          {hasChildren && allowCollapsed && (
            <Icon
              type={isOpen ? "icon-arrow-bold-down" : "icon-arrow-bold-right"}
            />
          )}
        </div>
        {renderChildren()}
      </div>
    </Permissions>
  );
};

const Menu = ({ className, allowCollapsed, ...props }) => {
  const { pathname, search } = useLocation();
  const [selectedKey, setSelectKeyChange] = useControlValue(props, {
    value: "currentKey",
    defaultValue: "defaultCurrentKey",
  });

  const [items, setItems] = useControlValue(props, {
    defaultValue: "defaultItems",
    value: "items",
    onChange: "onItemsChange",
  });

  const {
    items: targetItems,
    defaultOpenKeys,
    links,
    childrenKeys,
    hasStartIcon,
    hasChildren,
  } = useMemo(() => {
    const {
      items: targetItems,
      childrenKeys,
      nodeMapping,
    } = treeEnhance(items);
    let hasStartIcon = false,
      hasChildren = false;
    const links = [],
      defaultOpenKeys = [];
    childrenKeys?.["root"]?.forEach((key) => {
      const node = nodeMapping[key];
      if (node.iconType) {
        hasStartIcon = true;
      }
      node.path && links.push({ path: node.path, key });
      if (Array.isArray(node.children) && node.children.length > 0) {
        hasChildren = true;
        defaultOpenKeys.push(node.key);
      }
    });
    return {
      defaultOpenKeys,
      links,
      items: targetItems,
      childrenKeys,
      hasStartIcon,
      hasChildren,
    };
  }, [items]);
  useEffect(() => {
    const matchedPath = links.find(({ path }) => {
      return (
        ensureSlash(pathname.replace(/[#,?].*/, "")) === ensureSlash(path) ||
        ensureSlash(pathname + search) === ensureSlash(path)
      );
    });
    if (matchedPath) {
      setSelectKeyChange(matchedPath.key);
    }
  }, [links, pathname, search, setSelectKeyChange]);

  const [openKeys, setOpenKeys] = useControlValue(
    Object.assign({}, props, {
      defaultOpenKeys: props.defaultOpenKeys || defaultOpenKeys,
    }),
    {
      value: "openKeys",
      defaultValue: "defaultOpenKeys",
      onChange: "onOpenChange",
    }
  );

  const renderChildren = useCallback(
    (children, options) => {
      const { parentKey, depth, selectedKey, openKeys, paths } = Object.assign(
        {
          parentKey: null,
          depth: 0,
          paths: [],
        },
        options
      );
      if (Array.isArray(children) && children.length > 0) {
        return children.map(
          ({ children, key: currentKey, originItem, ...item }) => {
            return (
              <MenuItem
                {...Object.assign({}, item)}
                id={currentKey}
                parentId={parentKey}
                depth={depth}
                allowCollapsed={allowCollapsed}
                isSelected={
                  currentKey === selectedKey ||
                  (childrenKeys[currentKey] &&
                    childrenKeys[currentKey].indexOf(selectedKey) > -1)
                }
                onClick={setSelectKeyChange}
                onLoad={(data) => {
                  setItems((items) => {
                    const core = (children) => {
                      if (Array.isArray(children) && children.length > 0) {
                        return children.map((item) => {
                          return Object.assign({}, item, {
                            children:
                              originItem === item ? data : core(item.children),
                          });
                        });
                      }
                      return null;
                    };

                    return core(items);
                  });
                }}
                isOpen={(openKeys || []).indexOf(currentKey) > -1}
                key={currentKey}
                onOpenChange={() => {
                  setOpenKeys((openKeys) => {
                    const newOpenKeys = openKeys.slice(0);
                    if (openKeys.indexOf(currentKey) > -1) {
                      newOpenKeys.splice(openKeys.indexOf(currentKey), 1);
                    } else {
                      newOpenKeys.push(currentKey);
                    }
                    return newOpenKeys;
                  });
                }}
              >
                {renderChildren(children, {
                  parentKey,
                  depth: depth + 1,
                  selectedKey,
                  openKeys,
                  paths: [...paths, currentKey],
                })}
              </MenuItem>
            );
          }
        );
      }
      return null;
    },
    [setItems, setOpenKeys, setSelectKeyChange, childrenKeys, allowCollapsed]
  );

  return (
    <div
      className={classnames(className, style["menu"], {
        [style["all-no-start-icon"]]: !hasStartIcon,
        [style["has-children-node"]]: hasChildren,
      })}
    >
      {renderChildren(targetItems, { selectedKey, openKeys })}
    </div>
  );
};

Menu.defaultProps = {
  defaultItems: [],
  allowCollapsed: true,
};

export default Menu;
