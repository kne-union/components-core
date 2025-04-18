import {FileList, FileListOptionButtons} from "@kne/react-file";
import dropRight from "lodash/dropRight";
import last from "lodash/last";
import FormInfo, {Input, useFormModal} from "@components/FormInfo";
import Modal from "@components/Modal";

const useEdit = ({apis}) => {
    const formModal = useFormModal();
    return typeof apis?.onEditModalShow === 'function' ? apis.onEditModalShow : (item, apis) => {
        const modalApi = formModal({
            size: "small",
            title: "修改文件名称",
            formProps: {
                data: {
                    name: dropRight(item.filename.split(".")).join("."),
                },
                onSubmit: async (data) => {
                    const res =
                        apis?.onEdit &&
                        (await apis?.onEdit({
                            formData: Object.assign({}, data, {
                                name: `${data.name}.${last(item.filename.split("."))}`,
                            }),
                            item,
                        }));
                    if (res !== false) {
                        modalApi.close();
                    }
                },
            },
            children: (
                <FormInfo
                    column={1}
                    list={[<Input name="name" label={"文件名称"} rule="REQ LEN-0-100"/>]}
                />
            ),
        });
    };
};

const List = ({apis, ...p}) => {
    const handlerEdit = useEdit({apis});
    return (
        <FileList
            {...p}
            apis={apis}
            onEdit={(item) => handlerEdit(item, apis)}
            onDelete={apis?.onDelete}
            renderModal={typeof p.renderModal === 'function' ? p.renderModal : ({onCancel, ...modalProps}) => {
                return <Modal {...Object.assign({}, modalProps)} onClose={onCancel}/>;
            }}
        />
    );
};

const OptionButtons = (props) => {
    const handlerEdit = useEdit({apis: props.apis});
    return (
        <FileListOptionButtons
            {...props}
            onEdit={(item) => handlerEdit(item, props.apis)}
            onDelete={props.apis?.onDelete}
            renderModal={typeof props.renderModal === 'function' ? props.renderModal : ({onCancel, ...modalProps}) => {
                return <Modal {...Object.assign({}, modalProps)} onClose={onCancel}/>;
            }}
        />
    );
};

export default List;

export {OptionButtons};
