import { Col, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";
import Filter from "@components/Filter";
import Icon from "@components/Icon";
import style from "../style.module.scss";

const PageTitle = ({ title, filter, titleExtra, titleLeftExtra, backUrl }) => {
  const navigator = useNavigate();
  if (filter) {
    return (
      <Filter className={style["page-title"]} {...filter} extra={titleExtra} />
    );
  }
  if (!(title || titleLeftExtra || titleExtra)) {
    return null;
  }
  return (
    <Row justify="space-between" align="middle" className={style["page-title"]}>
      <Col>
        <Space>
          {title ? (
            <div className={style["page-title-text"]}>
              {backUrl ? (
                <Space>
                  <span
                    className={style["back-icon"]}
                    onClick={() => {
                      navigator(backUrl);
                    }}
                  >
                    <Icon type="icon-arrow-thin-left" />
                  </span>
                  <span>{title}</span>
                </Space>
              ) : (
                title
              )}
            </div>
          ) : null}
          {titleLeftExtra ? titleLeftExtra : null}
        </Space>
      </Col>
      <Col>{titleExtra}</Col>
    </Row>
  );
};

export default PageTitle;
