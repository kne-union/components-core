import Drawer, { useDrawer } from "@components/Drawer";
import FetchButton from "@common/components/FetchButton";
import style from "./style.module.scss";
import computedCommonProps from "./computedModalCommonProps";

const FormDrawer = (props) => {
  return (
    <Drawer
      {...computedCommonProps(
        Object.assign({}, props, { className: style["form-drawer"] })
      )}
    />
  );
};

export default FormDrawer;

export const useFormDrawer = () => {
  const drawer = useDrawer();
  return (props) =>
    drawer(
      computedCommonProps(
        Object.assign({}, props, { className: style["form-drawer"] })
      )
    );
};

export const FormDrawerButton = (props) => {
  const formDrawer = useFormDrawer();
  return <FetchButton {...props} modalFunc={formDrawer} />;
};
