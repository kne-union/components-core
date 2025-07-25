import {forwardRef} from "react";
import SuperSelect, {
    SelectedTagList, SelectTableList,
} from "@kne/super-select";
import Modal from "@components/Modal";
import Image from "@components/Image";
import {Flex} from "antd";
import style from './style.module.scss';
import classnames from 'classnames';
import "@kne/super-select/dist/index.css";

const SuperSelectField = forwardRef((p, ref) => {
    const props = Object.assign({}, {
        children: ({components}) => {
            return (<Flex vertical>
                {components.search}
                {components.selectedAll}
                {components.fetchList}
                {props.isPopup !== false && components.selectedTag}
            </Flex>);
        }, renderModal: (contextProps) => {
            const {props, open, onOpenChange, value, onComplete} = contextProps;
            const {placeholder, children, showSelectedTag, onConfirm} = props;
            return (<Modal
                title={placeholder}
                open={open}
                onClose={() => {
                    onOpenChange(false);
                }}
                footer={showSelectedTag && <SelectedTagList/>}
                onConfirm={() => {
                    onComplete();
                    if (typeof onConfirm === "function") {
                        return onConfirm(value);
                    }
                }}
            >
                {children(contextProps)}
            </Modal>);
        },
    }, p);

    return <SuperSelect {...props} ref={ref}/>;
});

export default SuperSelectField;

export const SuperSelectTableListField = forwardRef((p, ref) => {
    const props = Object.assign({}, {
        renderModal: (contextProps) => {
            const {props, open, value, onOpenChange, onComplete} = contextProps;
            const {placeholder, children, onConfirm} = props;
            return (<Modal
                title={placeholder}
                open={open}
                onClose={() => {
                    onOpenChange(false);
                }}
                onConfirm={() => {
                    onComplete();
                    if (typeof onConfirm === "function") {
                        return onConfirm(value);
                    }
                }}
            >
                {children(contextProps)}
            </Modal>);
        },
    }, p);
    return <SelectTableList {...props} ref={ref}/>;
});

export const SuperSelectUserField = forwardRef((p, ref) => {
    return (<SuperSelectField
        {...p}
        ref={ref}
        renderItemContent={({item, props}) => {
            const {labelKey, avatarKey, descriptionKey} = props;
            const avatar = item[avatarKey || 'avatar'];
            return (<Flex gap={8}>
                <Image.Avatar
                    {...Object.assign({}, typeof avatar === "string" ? {id: avatar} : avatar)}
                    size={32}
                    gender="M"
                />
                <Flex vertical gap={8} align="center">
                    <div
                        className={classnames(style["select-list-item-label"], "select-list-item-label")}>{item[labelKey]}</div>
                    {item[descriptionKey || 'description'] && (<div
                        className={classnames(style["select-list-item-description"], "select-list-item-description")}>
                        {item[descriptionKey || 'description']}
                    </div>)}
                </Flex>
            </Flex>);
        }}
    />);
});
