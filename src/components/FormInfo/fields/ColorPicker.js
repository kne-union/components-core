import {hooks} from "@kne/react-form-antd";
import {ColorPicker as ColorPickerField} from 'antd';

const {useOnChange} = hooks;

const ColorPicker = (props) => {
    const render = useOnChange(Object.assign({}, {placeholder: "请选择" + props.label}, props));
    return render(ColorPickerField);
};

ColorPicker.Field = ColorPicker;
export default ColorPicker;
