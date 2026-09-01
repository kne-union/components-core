import classnames from "classnames";
import Drawer, { useDrawer } from "@components/Drawer";
import style from "./style.module.scss";
import { buildFormOverlayProps } from "./FormModal";

const buildFormDrawerProps = (props, options) => {
  const { placement = "right", className, ...rest } = props;
  return {
    ...buildFormOverlayProps({ ...rest, className }, options),
    placement,
    className: classnames(style["form-drawer"], className),
  };
};

const FormDrawer = (props) => <Drawer {...buildFormDrawerProps(props)} />;

export default FormDrawer;

export const useFormDrawer = () => {
  const drawer = useDrawer();
  return (props) => {
    const api = {};
    const close = () => api.close?.();
    const opened = drawer(
      buildFormDrawerProps(
        {
          ...props,
          onClose: props.onClose || close,
        },
        { close },
      ),
    );
    api.close = opened.close;
    return opened;
  };
};
