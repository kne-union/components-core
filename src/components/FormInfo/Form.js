import {forwardRef, useEffect, useState} from "react";
import {usePreset, useGlobalContext} from "@components/Global";
import get from "lodash/get";
import formPreset from "@components/FormInfo/preset";
import FormLangProvider from "@components/FormInfo/FormLangProvider";
import {Form as ReactForm} from '@kne/form-info';
import {Provider as HelperGuideProvider} from "@components/FormInfo/HelperGuideLabel";
import '@kne/form-info/dist/index.css';
import withLocale from "./withLocale";

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

const Form = withLocale(forwardRef(({helperGuideName, lang, ...props}, ref) => {
    return (<FormLangProvider value={lang}>
        <HelperGuideProvider value={helperGuideName}>
            <SetPreset>
                <ReactForm {...props} ref={ref}/>
            </SetPreset>
        </HelperGuideProvider>
    </FormLangProvider>);
}));
export default Form;
