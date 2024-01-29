import importMessages from "./locale";
import { IntlProvider } from "@components/Intl";
import Icon from "@components/Icon";
import { Space, Typography } from "antd";
import classnames from "classnames";
import style from "./style.module.scss";
import Enum from "@components/Enum";

const HelperGuide = ({ name, className }) => {
  return (
    <IntlProvider importMessages={importMessages} moduleName="HelperGuide">
      <Enum moduleName="helperGuide" name={name}>
        {(data) => {
          return (
            data &&
            data.value && (
              <div className={classnames(style["helper-guide"], className)}>
                <Space className={style["inner"]}>
                  <Icon colorful type="icon-color-bangzhuyindao" />
                  <span className={style["content"]}>{data.content}</span>
                  {data.url && (
                    <Typography.Link
                      className={style["link"]}
                      href={data.url}
                      target="_blank"
                    >
                      查看帮助
                      <Icon type="icon-shuangjiantou-right" />
                    </Typography.Link>
                  )}
                </Space>
              </div>
            )
          );
        }}
      </Enum>
    </IntlProvider>
  );
};

export default HelperGuide;
