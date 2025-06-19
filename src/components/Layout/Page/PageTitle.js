import {Col, Row, Space, Flex} from "antd";
import {useNavigate} from "react-router-dom";
import Filter from "@components/Filter";
import Icon from "@components/Icon";
import style from "../style.module.scss";

const PageTitle = ({title, filter, titleExtra, titleLeftExtra, backUrl}) => {
    const navigator = useNavigate();
    if (filter) {
        return (<Filter className={style["page-title"]} {...filter} extra={titleExtra}/>);
    }
    if (!(title || titleLeftExtra || titleExtra)) {
        return null;
    }
    return (<Row justify="space-between" align="middle" className={style["page-title"]}>
        <Col flex={1}>
            <Flex gap={8} align="center">
                {title ? (<div className={style["page-title-text"]}>
                    {backUrl ? (<Flex gap={8} align="center">
                  <span
                      className={style["back-icon"]}
                      onClick={() => {
                          navigator(backUrl);
                      }}
                  >
                    <Icon type="icon-arrow-thin-left"/>
                  </span>
                        <span>{title}</span>
                    </Flex>) : (title)}
                </div>) : null}
                {titleLeftExtra ? titleLeftExtra : null}
            </Flex>
        </Col>
        <Col>{titleExtra}</Col>
    </Row>);
};

export default PageTitle;
