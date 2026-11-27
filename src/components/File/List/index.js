import {FileList, FileListOptionButtons} from "@kne/react-file";
import dropRight from "lodash/dropRight";
import last from "lodash/last";
import FormInfo, {Input, useFormModal} from "@components/FormInfo";
import renderModal from "../renderModal";
import {useIntl} from '@kne/react-intl';
import withLocale from '../withLocale';

const useEdit = ({apis}) => {
    const {formatMessage} = useIntl();
    const formModal = useFormModal();
    return typeof apis?.onEditModalShow === 'function' ? apis.onEditModalShow : (item, apis) => {
        const modalApi = formModal({
            size: "small", title: formatMessage({id: "editDocumentName"}), formProps: {
                data: {
                    name: dropRight(item.filename.split(".")).join("."),
                }, onSubmit: async (data) => {
                    const res = apis?.onEdit && (await apis?.onEdit({
                        formData: Object.assign({}, data, {
                            name: `${data.name}.${last(item.filename.split("."))}`,
                        }), item,
                    }));
                    if (res !== false) {
                        modalApi.close();
                    }
                },
            }, children: (<FormInfo
                column={1}
                list={[<Input name="name"
                              label={formatMessage({id: "documentName"})} rule="REQ LEN-0-100"/>]}
            />),
        });
    };
};

const List = withLocale(({apis, ...p}) => {
    const handlerEdit = useEdit({apis});
    return (<FileList
        {...p}
        apis={apis}
        onEdit={(item) => handlerEdit(item, apis)}
        onDelete={apis?.onDelete}
        renderModal={p.renderModal || renderModal}
    />);
});

const OptionButtons = withLocale((props) => {
    const handlerEdit = useEdit({apis: props.apis});
    return (<FileListOptionButtons
        {...props}
        onEdit={(item) => handlerEdit(item, props.apis)}
        onDelete={props.apis?.onDelete}
        renderModal={props.renderModal || renderModal}
    />);
});

export default List;

export {OptionButtons};
