import { Button, Space } from "antd";
import Icon from "@components/Icon";
import ConfirmButton from "@components/ConfirmButton";
import DownloadButton from "../Download";
import FormInfo, { Input, useFormModal } from "@components/FormInfo";
import { useIntl } from "@components/Intl";
import last from "lodash/last";
import dropRight from "lodash/dropRight";
import useFileModal from "../useFileModal";

const OptionButtons = ({ item, hasPreview, getPermission, apis }) => {
  const { filename, id } = item;
  const { formatMessage } = useIntl({ moduleName: "File" });
  const formModal = useFormModal();
  const fileModal = useFileModal();
  return (
    <Space size={0}>
      {hasPreview && getPermission("preview", item) && (
        <Button
          type="text"
          icon={<Icon type="icon-yulan" />}
          onClick={() => {
            apis.onPreview
              ? apis.onPreview(item)
              : fileModal({ id, originName: filename, apis });
          }}
        />
      )}
      {getPermission("edit", item) && (
        <Button
          type="text"
          icon={<Icon type="icon-bianji" />}
          onClick={() => {
            const modalApi = formModal({
              size: "small",
              title: formatMessage({ id: "editDocumentName" }),
              formProps: {
                data: {
                  name: dropRight(item.filename.split(".")).join("."),
                },
                onSubmit: async (data) => {
                  const res =
                    apis.onEdit &&
                    (await apis.onEdit({
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
                  list={[
                    <Input
                      name="name"
                      label={formatMessage({ id: "documentName" })}
                      rule="REQ LEN-0-100"
                    />,
                  ]}
                />
              ),
            });
          }}
        />
      )}
      {getPermission("download", item) && (
        <DownloadButton type="text" id={id} filename={filename} />
      )}
      {getPermission("delete", item) && (
        <ConfirmButton
          type="text"
          icon={<Icon type="icon-shanchu" />}
          onClick={() => {
            return apis.onDelete && apis.onDelete(item);
          }}
        />
      )}
    </Space>
  );
};

OptionButtons.defaultProps = {
  hasPreview: true,
  apis: {},
  getPermission: (type, item) => {
    return true;
  },
};

export default OptionButtons;
