import preset from "./preset";
import FormInfo from "./FormInfo";
import fields, { fieldDecorator } from "./fields";
import List from "./List";
import TableList from "./TableList";
import FormApiButton from "./FormApiButton";
import FormModal, { useFormModal, FormModalButton } from "./FormModal";
import FormStepModal, {
  useFormStepModal,
  FormStepModalButton,
} from "./FormStepModal";
import FormDrawer, { useFormDrawer, FormDrawerButton } from "./FormDrawer";
import Form from "./Form";
import FormItem from "./FormItem";
import ErrorTip from "./ErrorTip";
import { SubmitButton, CancelButton } from "@kne/react-form-antd";

preset();

FormInfo.fields = fields;
FormInfo.List = List;
FormInfo.TableList = TableList;
FormInfo.FormApiButton = FormApiButton;
FormInfo.FormModal = FormModal;
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
  useFormStepModal,
  FormStepModalButton,
  FormDrawer,
  useFormDrawer,
  FormDrawerButton,
};

export { default as SelectInnerInput } from "./SelectInnerInput";

export default FormInfo;
