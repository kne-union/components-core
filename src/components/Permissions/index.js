import {createElement} from "react";
import {Result, Tooltip} from "antd";
import get from "lodash/get";
import classnames from "classnames";
import style from "./style.module.scss";
import {useGlobalContext, usePreset} from "@components/Global";

export const computedIsPass = ({permissions, request}) => {
    return Array.isArray(request) && request.length > 0 ? request.some((currentKey) => (permissions || []).indexOf(currentKey) > -1) : true;
};

export const usePermissions = () => {
    const {global} = useGlobalContext();
    const {permissions, permissionsPath} = usePreset();
    return {
        permissions: global.permissions || permissions || (permissionsPath && get(global, permissionsPath)) || [],
    };
};

export const usePermissionsPass = ({request}) => {
    const {permissions} = usePermissions();
    return computedIsPass({permissions, request});
};

const Permissions = ({
                         type = 'hidden',
                         className,
                         tagName = 'span',
                         message = '您暂无权限，请联系管理员',
                         request,
                         children,
                         ...props
                     }) => {
    const isPass = usePermissionsPass({request});
    if (typeof children === "function") {
        return children({isPass, type, request});
    }

    if (isPass === true) {
        return children;
    }

    if (type === "error") {
        return <Result status="403" subTitle={message}/>;
    }

    if (type === "tooltip") {
        return (<Tooltip title={message}>
            {createElement(tagName, {...props, className: classnames(style["outer"], className)}, children)}
        </Tooltip>);
    }

    return null;
};

export default Permissions;
