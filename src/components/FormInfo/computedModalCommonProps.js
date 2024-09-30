import importMessages from "./locale";
import { CancelButton, SubmitButton } from "@kne/react-form-antd";
import { IntlProvider, FormattedMessage } from "@components/Intl";
import { Form } from "./formModule";
import classnames from "classnames";
import style from "./style.module.scss";

const localeModuleName = "FormInfo";

const computedCommonProps = ({
  className,
  withDecorator,
  footerButtons,
  formProps,
  cancelText,
  saveText,
  autoClose,
  ...modalProps
}) => {
  return {
    ...modalProps,
    footerButtons: footerButtons || [
      {
        children: (
          <IntlProvider
            importMessages={importMessages}
            moduleName={localeModuleName}
          >
            {cancelText || (
              <FormattedMessage id={"Cancel"} moduleName={localeModuleName} />
            )}
          </IntlProvider>
        ),
        ButtonComponent: CancelButton,
      },
      {
        type: "primary",
        children: (
          <IntlProvider
            importMessages={importMessages}
            moduleName={localeModuleName}
          >
            {saveText || (
              <FormattedMessage id={"Save"} moduleName={localeModuleName} />
            )}
          </IntlProvider>
        ),
        ButtonComponent: SubmitButton,
        autoClose: false,
      },
    ],
    withDecorator: (render, args) => {
      const innerRender = (props) => {
        const { onSubmit, ..._formProps } =
          typeof formProps === "function" ? formProps(props) : formProps;
        return (
          <Form
            {..._formProps}
            onSubmit={async (...args) => {
              const res = onSubmit && (await onSubmit(...args));
              if (res !== false) {
                autoClose && props.close();
              }
            }}
          >
            <IntlProvider importMessages={importMessages} moduleName="FormInfo">
              {render(props)}
            </IntlProvider>
          </Form>
        );
      };
      return typeof withDecorator === "function"
        ? withDecorator(innerRender, args)
        : innerRender(args);
    },
    className: classnames(className, style["form-outer"]),
  };
};

export default computedCommonProps;
