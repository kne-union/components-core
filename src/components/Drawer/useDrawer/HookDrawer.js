import {useState, useImperativeHandle, forwardRef} from "react";
import {Drawer} from "antd";

const HookDrawer = ({config}, ref) => {
    const [open, setOpen] = useState(true);
    const [innerConfig, setInnerConfig] = useState(config);

    const close = (...args) => {
        setOpen(false);
        const triggerCancel = args.some((param) => param && param.triggerCancel);
        if (innerConfig.onClose && triggerCancel) {
            innerConfig.onClose(() => {
            }, ...args.slice(1));
        }
    };

    useImperativeHandle(ref, () => ({
        destroy: close, update: (newConfig) => {
            setInnerConfig((originConfig) => ({
                ...originConfig, ...newConfig,
            }));
        },
    }));

    return <Drawer {...innerConfig} ref={ref} open={open} onClose={close}/>;
};

export default forwardRef(HookDrawer);
