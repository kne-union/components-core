import { Col, List as AntdList, Row, Space } from "antd";
import Image from "@components/Image";
import Icon from "@components/Icon";

import createListField from "./createListField";
import listStyle from "./list.module.scss";
import classnames from "classnames";
import style from "./user.module.scss";

export default createListField({
  renderList: ({ list, onSelect, itemIsSelected, isSelectedAll }) => {
    return (
      <AntdList
        size="small"
        className={classnames(listStyle["list"], {
          [listStyle["is-selected-all"]]: isSelectedAll,
          [style["is-selected-all"]]: isSelectedAll,
        })}
        dataSource={list}
        renderItem={(item) => {
          const isSelected = itemIsSelected(item);
          return (
            <AntdList.Item
              className={classnames(listStyle["list-item"], {
                [listStyle["is-selected"]]: isSelected,
              })}
              onClick={() => onSelect(item)}
            >
              <Row wrap={false} align="middle" className={style["list-inner"]}>
                <Col>
                  <Image.Avatar
                    {...Object.assign({}, item.avatar)}
                    size={40}
                    gender="M"
                  />
                </Col>
                <Col className={style["list-info"]} flex={1}>
                  <Space direction="vertical">
                    <span className={listStyle["item-label"]}>
                      {item.label}
                    </span>
                    {item.description && (
                      <span className={style["item-des"]}>
                        {item.description}
                      </span>
                    )}
                  </Space>
                </Col>
                <Col>
                  {isSelectedAll || isSelected ? (
                    <Icon
                      className={style["selected-icon"]}
                      type="icon-gouxuan"
                    />
                  ) : null}
                </Col>
              </Row>
            </AntdList.Item>
          );
        }}
      />
    );
  },
});
