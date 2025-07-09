import {hooks} from "@kne/react-form-antd";
import {ColorPicker as ColorPickerFieldAntd} from 'antd';

const {useOnChange} = hooks;

const ColorPickerField = (props) => {
    return <ColorPickerFieldAntd {...props} onChange={(value) => {
        return props.onChange(value.toHexString());
    }}/>;
};

const ColorPicker = (props) => {
    const render = useOnChange(Object.assign({}, props));
    return render(ColorPickerField);
};

ColorPicker.Field = ColorPicker;
export default ColorPicker;
