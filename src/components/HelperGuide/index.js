import Icon from "@components/Icon";
import { Space, Typography } from "antd";
import classnames from "classnames";
import style from "./style.module.scss";
import Enum from "@components/Enum";
import withLocale from './withLocale';
import { useIntl } from '@kne/react-intl';

const HelperGuide = withLocale(({ name, className }) => {
  const { formatMessage } = useIntl();
  return (
    <Enum moduleName="helperGuide" name={name}>
      {(data) => {
        return (
          data &&
          data.value && (
            <div className={classnames(style["helper-guide"], className)}>
              <Space className={style["inner"]} size={4}>
                <Icon colorful type="icon-color-bangzhuyindao" />
                <span className={style["content"]}>{data.content}</span>
                {data.url && (
                  <Typography.Link
                    className={style["link"]}
                    href={data.url}
                    target="_blank"
                  >
                    {formatMessage({ id: 'ViewHelp' })}
                    <Icon type="icon-shuangjiantou-right" />
                  </Typography.Link>
                )}
              </Space>
            </div>
          )
        );
      }}
    </Enum>
  );
});

export default HelperGuide;
