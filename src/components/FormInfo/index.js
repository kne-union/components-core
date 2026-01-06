import preset from "./preset";
import fields, {fieldDecorator} from "./fields";
import {List, TableList, default as FormInfo, FormSteps} from "@kne/form-info";
import FormApiButton from "./FormApiButton";
import FormModal, {useFormModal, FormModalButton} from "./FormModal";
import FormStepModal, {
    useFormStepModal, FormStepModalButton,
} from "./FormStepModal";
import FormDrawer, {useFormDrawer, FormDrawerButton} from "./FormDrawer";
import Form from "./Form";
import FormItem from "./FormItem";
import ErrorTip from "./ErrorTip";
import {MultiField} from "@kne/form-info";
import {
    SubmitButton, CancelButton, useFormContext, hooks, widget, utils, formUtils,
} from "@kne/react-form-antd";

preset();

FormInfo.fields = fields;
FormInfo.List = List;
FormInfo.TableList = TableList;
FormInfo.FormApiButton = FormApiButton;
FormInfo.FormModal = FormModal;
FormInfo.FormSteps = FormSteps;
FormInfo.useFormModal = useFormModal;
FormInfo.FormModalButton = FormModalButton;
FormInfo.FormStepModal = FormStepModal;
FormInfo.useFormStepModal = useFormStepModal;
FormInfo.FormStepModalButton = FormStepModalButton;
FormInfo.FormDrawer = FormDrawer;
FormInfo.useFormDrawer = useFormDrawer;
FormInfo.FormDrawerButton = FormDrawerButton;
FormInfo.Form = Form;
FormInfo.FormItem = FormItem;
FormInfo.ErrorTip = ErrorTip;
FormInfo.SubmitButton = SubmitButton;
FormInfo.CancelButton = CancelButton;
FormInfo.fieldDecorator = fieldDecorator;
FormInfo.MultiField = MultiField;
FormInfo.useFormContext = useFormContext;
FormInfo.hooks = hooks;
FormInfo.widget = widget;
FormInfo.utils = utils;
FormInfo.formUtils = formUtils;

export * from "@kne/react-form-antd";

export * from "./formModule";

export {
    Form,
    FormItem,
    ErrorTip,
    fields,
    fieldDecorator,
    List,
    TableList,
    FormApiButton,
    FormModal,
    useFormModal,
    FormModalButton,
    FormStepModal,
    FormSteps,
    useFormStepModal,
    FormStepModalButton,
    FormDrawer,
    useFormDrawer,
    FormDrawerButton,
    MultiField,
};

export {default as SelectInnerInput} from "./SelectInnerInput";

export default FormInfo;
