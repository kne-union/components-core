//这个已经废弃可能会在之后删除，请勿使用
import {useMemo} from "react";
import {Col, Menu as AntdMenu, Row} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import Icon from "@components/Icon";
import useRefCallback from "@kne/use-ref-callback";
import classnames from "classnames";
import ensureSlash from "@kne/ensure-slash";
import {computedIsPass, usePermissions} from "@components/Permissions";
import style from "./style.module.scss";

const Menu = ({
                  items, currentKey, onChange, allowCollapsed = true, defaultOpenKeys,
              }) => {
    const navigation = useNavigate();
    const {pathname, search} = useLocation();
    const {permissions} = usePermissions();

    const handlerClick = useRefCallback(({path, onClick, key}) => {
        if (path) {
            navigation(path);
            return;
        }
        onChange && currentKey !== key && onChange(key);
        onClick && onClick();
    });

    const {hasChildren, pathList, targetItems} = useMemo(() => {
        const hasChildren = items.some(({children}) => Array.isArray(children));
        const pathList = [];

        const permissionFilter = ({permissionRequest}) => permissionRequest ? computedIsPass({
            permissions, request: permissionRequest,
        }) : true;

        const targetItems = items
            .filter(({children, path, onClick}) => (Array.isArray(children) && children.length > 0) || path || onClick)
            .filter(permissionFilter)
            .map(({
                      label, key, iconType, iconColorFul, path, onClick, children, className,
                  }) => {
                if (path && !(Array.isArray(children) && children.length > 0)) {
                    pathList.push({key, path});
                }
                return {
                    key,
                    className: classnames(className, {
                        [style["sub-menu"]]: hasChildren,
                    }),
                    title: label,
                    label: (<Row gutter={4}>
                        <Col>
                            {iconType ? (<Icon type={iconType} colorful={iconColorFul}/>) : null}
                        </Col>
                        <Col flex={1}>{label}</Col>
                    </Row>),
                    onClick: hasChildren && Array.isArray(children) && children.length > 0 ? null : () => handlerClick({
                        key, path, onClick,
                    }),
                    children: hasChildren && Array.isArray(children) && children.length > 0 ? children
                        .filter(permissionFilter)
                        .map(({label, key, path, onClick}) => {
                            if (path) {
                                pathList.push({key, path});
                            }
                            return {
                                key, label, title: label, onClick: () => handlerClick({key, path, onClick}),
                            };
                        }) : null,
                };
            });
        return {hasChildren, pathList, targetItems};
    }, [items, handlerClick, permissions]);

    const selectKeys = useMemo(() => {
        if (currentKey) {
            return [currentKey];
        }
        const matchedPath = pathList.find(({path}) => {
            return (ensureSlash(pathname.replace(/[#,?].*/, "")) === ensureSlash(path) || ensureSlash(pathname + search, "") === ensureSlash(path));
        });
        if (matchedPath) {
            return [matchedPath.key];
        }
        return [];
    }, [currentKey, search, pathname, pathList]);

    return (<AntdMenu
        className={classnames(style["layout-menu"], {
            [style["no-collapsed"]]: !allowCollapsed, [style["has-not-children"]]: !hasChildren,
        })}
        selectedKeys={selectKeys}
        defaultOpenKeys={defaultOpenKeys || (hasChildren ? items.map(({key}) => key) : [])}
        items={targetItems}
        mode="inline"
        inlineCollapsed={false}
        inlineIndent={0}
        expandIcon={<Icon type="icon-arrow-bold-right"/>}
    />);
};

export default Menu;
