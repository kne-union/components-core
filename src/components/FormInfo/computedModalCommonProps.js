import {CancelButton, SubmitButton} from "@kne/react-form-antd";
import {FormattedMessage} from '@kne/react-intl';
import {Form} from "./formModule";
import classnames from "classnames";
import style from "./style.module.scss";

const computedCommonProps = ({
                                 className,
                                 withDecorator,
                                 footerButtons,
                                 formProps,
                                 cancelText,
                                 saveText,
                                 autoClose = true,
                                 ...modalProps
                             }) => {
    return {
        ...modalProps, footerButtons: footerButtons || [{
            children: cancelText || <FormattedMessage id="Cancel"/>, ButtonComponent: CancelButton,
        }, {
            type: "primary",
            children: saveText || <FormattedMessage id="Save"/>,
            ButtonComponent: SubmitButton,
            autoClose: false,
        },], withDecorator: (render, args) => {
            const innerRender = (props) => {
                const {
                    onSubmit, key, ..._formProps
                } = Object.assign({}, typeof formProps === "function" ? formProps(props) : formProps);

                return (<Form
                    {..._formProps}
                    onSubmit={async (data, ...args) => {
                        const res = onSubmit && (await onSubmit(data, Object.assign({}, props), ...args));
                        if (res !== false) {
                            autoClose && props.close();
                        }
                    }}
                >
                    {render(props)}
                </Form>);
            };
            return typeof withDecorator === "function" ? withDecorator(innerRender, args) : innerRender(args);
        }, className: classnames(className, style["form-outer"]),
    };
};

export default computedCommonProps;
