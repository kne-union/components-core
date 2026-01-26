import {useSignature} from '@kne/react-pdf-sign';
import '@kne/react-pdf-sign/dist/index.css';
import {Button} from 'antd';
import {useFileUpload} from "@common/hocs/withInputFile";
import useControlValue from "@kne/use-control-value";
import {hooks} from "@kne/react-form-antd";
import Image from '@components/Image';
import withLocale from '../../withLocale';
import {useIntl} from '@kne/react-intl';

const {useOnChange} = hooks;

/**
 * 签名表单字段组件，支持签名模态框调用和图片展示
 * @param {Object} props - 组件属性
 * @param {Function} [props.render] - 自定义渲染函数，接收{modal, value, placeholder}参数
 * @param {string} props.placeholder - 按钮显示的占位文本
 * @param {string} props.title - 签名模态框标题
 * @param {number} props.width - 签名画布宽度
 * @param {number} props.height - 签名画布高度
 * @param {boolean} props.mask - 是否显示遮罩层
 * @param {Function} props.onUpload - 文件上传回调函数
 * @param {Object} others - 其他传递给Button组件的属性
 * @returns {React.ReactNode} 渲染结果：自定义渲染内容/签名图片/上传按钮
 */
const SignatureField = withLocale((props) => {
    const {formatMessage} = useIntl();
    const {
        render,
        placeholder = formatMessage({id: 'ClickSign'}),
        title = formatMessage({id: 'Sign'}),
        width,
        height,
        mask,
        onUpload,
        ...others
    } = props;
    const [value, onChange] = useControlValue(props);
    const {onFileSelected} = useFileUpload({
        onUpload: onUpload, maxLength: 1, value: value ? [value] : [], onChange: (value) => {
            onChange(value[0]);
        }
    });
    const modal = useSignature();
    if (typeof render === "function") {
        return render({modal, value, placeholder});
    }

    return <Button {...others} style={{height: '62px', overflow: 'hidden'}} onClick={() => {
        modal({
            title, width, height, mask, onSuccess: async (file) => {
                await onFileSelected([file]);
            },
        });
    }}>{value && value.id ? <Image id={value.id} style={{height: '60px'}}/> : placeholder}</Button>;
});

const Signature = ({...props}) => {
    const render = useOnChange(props);
    return render(SignatureField);
};

Signature.Field = SignatureField;

export default Signature;

