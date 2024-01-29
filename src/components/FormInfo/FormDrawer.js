import Drawer, { useDrawer } from "@components/Drawer";
import classnames from "classnames";
import {
  CancelButton,
  FormAntd as Form,
  SubmitButton,
} from "@kne/react-form-antd";
import FetchButton from "@common/components/FetchButton";
import { IntlProvider } from "@components/Intl";
import style from "./style.module.scss";
import importMessages from "./locale";

const defaultFooterButtons = [
  { children: "取消", ButtonComponent: CancelButton },
  {
    type: "primary",
    children: "保存",
    ButtonComponent: SubmitButton,
    autoClose: false,
  },
];

const computedCommonProps = ({
  className,
  withDecorator,
  footerButtons = defaultFooterButtons,
  formProps,
  ...props
}) => {
  return {
    ...props,
    footerButtons,
    className: classnames(className, style["form-outer"], style["form-drawer"]),
    withDecorator: (render) => {
      const innerRender = (props) => {
        const _formProps =
          typeof formProps === "function" ? formProps(props) : formProps;
        return (
          <Form {..._formProps}>
            <IntlProvider importMessages={importMessages} moduleName="FormInfo">
              {render(props)}
            </IntlProvider>
          </Form>
        );
      };
      return typeof withDecorator === "function"
        ? withDecorator(innerRender)
        : innerRender();
    },
  };
};

const FormDrawer = (props) => {
  return <Drawer {...computedCommonProps(props)} />;
};

export default FormDrawer;

export const useFormDrawer = () => {
  const drawer = useDrawer();
  return (props) => drawer(computedCommonProps(props));
};

export const FormDrawerButton = (props) => {
  const formDrawer = useFormDrawer();
  return <FetchButton {...props} modalFunc={formDrawer} />;
};
