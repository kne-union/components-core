import { Col, List as AntdList, Row, Space, Spin, Typography } from "antd";
import FileType from "@kne/react-file-type";
import OptionButtons from "./OptionButtons";
import last from "lodash/last";
import dayjs from "dayjs";
import style from "./style.module.scss";
import importMessages from "../locale";
import { FormattedMessage, IntlProvider } from "@components/Intl";

const List = ({
  className,
  dataSource,
  getPermission,
  infoItemRenders,
  apis,
}) => {
  return (
    <IntlProvider importMessages={importMessages} moduleName="File">
      <AntdList
        className={className}
        dataSource={dataSource.map((item, index) => {
          item.index = index;
          return item;
        })}
        rowKey={(item) =>
          `item_${
            (item.uuid && `uuid_${item.uuid}`) ||
            (item.id && `id_${item.id}`) ||
            (item.ossId && `id_${item.ossId}`)
          }`
        }
        renderItem={(item) => {
          const { type, filename } = item;
          return (
            <AntdList.Item className={style["list-item-outer"]}>
              <Row
                justify="space-between"
                wrap={false}
                className={style["list-item"]}
              >
                <Col flex={1}>
                  <div className={style["split"]} />
                  <Space className="is-block" align="start" size={4}>
                    <FileType type={last(filename?.split("."))} size={14} />
                    {filename}
                  </Space>
                </Col>
                {infoItemRenders &&
                  infoItemRenders.map((render, index) => {
                    return (
                      <Col span={render.span || 4} key={index}>
                        {type !== "uploading" &&
                          (typeof render === "function"
                            ? render
                            : render.render)(item)}
                        <div className={style["split"]} />
                      </Col>
                    );
                  })}
                <Col className={style["list-options"]}>
                  {type !== "uploading" ? (
                    <OptionButtons
                      getPermission={getPermission}
                      item={item}
                      apis={apis}
                    />
                  ) : (
                    <Space className={style["loading"]}>
                      <Spin size="small" />
                      <Typography.Link>
                        <FormattedMessage id="uploading" moduleName="File" />
                      </Typography.Link>
                    </Space>
                  )}
                </Col>
              </Row>
            </AntdList.Item>
          );
        }}
        bordered
      />
    </IntlProvider>
  );
};

List.defaultProps = {
  infoItemRenders: [
    (item) => {
      return item.userName ? (
        <Typography.Text>{item.userName}</Typography.Text>
      ) : null;
    },
    (item) => {
      return item.date ? (
        <Typography.Text>
          {dayjs(item.date).format("YYYY-MM-DD HH:mm:ss")}
        </Typography.Text>
      ) : null;
    },
  ],
};

export default List;

export { OptionButtons };
