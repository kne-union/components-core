import { Checkbox, Col, List as AntdList, Row, Space } from "antd";
import classnames from "classnames";
import createListField from "./createListField";
import style from "./list.module.scss";

const AdvancedSelectField = createListField({
  renderList: ({ props, list, itemIsSelected, onSelect }) => {
    const { listClassName = "", selectIcon = null } = props || {};
    return (
      <AntdList
        className={classnames(style["list"], listClassName)}
        size="small"
        dataSource={list}
        renderItem={(item) => {
          const isSelected = itemIsSelected(item);
          return (
            <AntdList.Item
              className={classnames(style["list-item"], {
                [style["is-selected"]]: props.single && isSelected,
                [style["is-disabled"]]: item.disabled,
              })}
              onClick={() => {
                if (item.disabled) {
                  return;
                }
                onSelect(item);
              }}
            >
              <Row wrap={false}>
                {props.single ? null : (
                  <Col>
                    <Checkbox checked={isSelected} disabled={item.disabled} />
                  </Col>
                )}
                <Col>
                  <Space className={item?.className ?? ""}>
                    <span className={style["item-label"]}>{item.label}</span>
                    {item.description && (
                      <span className={style["item-des"]}>
                        {item.description}
                      </span>
                    )}
                  </Space>
                </Col>
              </Row>
              {isSelected && selectIcon}
            </AntdList.Item>
          );
        }}
      />
    );
  },
});

export default AdvancedSelectField;
export { default as createListField } from "./createListField";
export { default as UserField } from "./UserField";
export { default as TableField } from "./TableField";
