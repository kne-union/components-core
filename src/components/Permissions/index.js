import { createElement } from "react";
import { Result, Tooltip } from "antd";
import get from "lodash/get";
import classnames from "classnames";
import style from "./style.module.scss";
import { useGlobalContext as useContext } from "@kne/global-context";

export const computedIsPass = ({ permissions, request }) => {
  return Array.isArray(request) && request.length > 0
    ? request.some((currentKey) => (permissions || []).indexOf(currentKey) > -1)
    : true;
};

export const usePermissions = () => {
  const preset = useContext();
  return {
    permissions: get(preset, "global.accountInfo.permissions", []),
  };
};

export const usePermissionsPass = ({ request }) => {
  const { permissions } = usePermissions();
  return computedIsPass({ permissions, request });
};

const Permissions = ({
  type,
  className,
  tagName,
  message,
  request,
  children,
  ...props
}) => {
  const isPass = usePermissionsPass({ request });
  if (typeof children === "function") {
    return children({ isPass, type, request });
  }

  if (isPass === true) {
    return children;
  }

  if (type === "error") {
    return <Result status="403" subTitle={message} />;
  }

  if (type === "tooltip") {
    return (
      <Tooltip title={message}>
        {createElement(
          tagName,
          { ...props, className: classnames(style["outer"], className) },
          children
        )}
      </Tooltip>
    );
  }

  return null;
};

Permissions.defaultProps = {
  type: "hidden",
  tagName: "span",
  message: "您暂无权限，请联系管理员",
};

export default Permissions;
