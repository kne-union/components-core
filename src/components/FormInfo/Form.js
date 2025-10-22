import {forwardRef, useEffect, useState} from "react";
import {usePreset, useGlobalContext} from "@components/Global";
import get from "lodash/get";
import formPreset from "@components/FormInfo/preset";
import {IntlProvider} from "@components/Intl";
import importMessages from "@components/FormInfo/locale";
import FormLangProvider from "@components/FormInfo/FormLangProvider";
import InfoPage from "@components/InfoPage";
import {Provider as HelperGuideProvider} from "@components/FormInfo/HelperGuideLabel";
import {FormAntd as ReactForm} from "@kne/react-form-antd";
import classnames from "classnames";
import style from "@components/FormInfo/style.module.scss";

const SetPreset = ({children}) => {
    const [isPreset, setIsPreset] = useState(false);
    const preset = usePreset();
    const {locale} = useGlobalContext();
    const formInfo = get(preset, "formInfo", {});
    useEffect(() => {
        Promise.resolve(formPreset(formInfo, {locale})).then(() => {
            setIsPreset(true);
        });
    }, [formInfo, locale]);
    if (!isPreset) {
        return null;
    }
    return children;
};

const Form = forwardRef(({className, helperGuideName, children, lang, ...props}, ref) => {
    return (<IntlProvider importMessages={importMessages} moduleName="FormInfo">
        <FormLangProvider value={lang}>
            <HelperGuideProvider value={helperGuideName}>
                <SetPreset>
                    <ReactForm
                        {...props}
                        ref={ref}
                        className={classnames(className, style["form-outer"])}
                    >
                        <InfoPage>{children}</InfoPage>
                    </ReactForm>
                </SetPreset>
            </HelperGuideProvider>
        </FormLangProvider>
    </IntlProvider>);
});
export default Form;
