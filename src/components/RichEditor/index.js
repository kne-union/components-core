import { hooks } from "@components/FormInfo";
import ReactRichEditor from "./ReactRichEditor";

const { useOnBlur } = hooks;

const RichEditor = (props) => {
  const render = useOnBlur(props);
  return render(ReactRichEditor);
};

RichEditor.Field = RichEditor.field = ReactRichEditor;

export default RichEditor;
