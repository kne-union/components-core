import { Row, Col, Button, Typography } from "antd";
import QueueAnim from "rc-queue-anim";
import classnames from "classnames";
import SimpleBar from "@common/components/SimpleBar";
import { useGlobalContext, usePreset } from "@components/Global";
import Icon from "@components/Icon";
import Content from "@components/Content";
import style from "./style.module.scss";
import { useMemo, useRef, useState, useEffect } from "react";
import groupBy from "lodash/groupBy";
import first from "lodash/first";
import range from "lodash/range";
import LoadingButton, { useLoading } from "@components/LoadingButton";
import findIndex from "lodash/findIndex";

const LEVEL = ["high", "middle", "low"];

const NotificationItem = ({
  level,
  title,
  groupLength,
  subtitle,
  content,
  link,
  id,
  children,
  className,
}) => {
  const { setGlobal } = useGlobalContext("notification");
  const { apis, ajax } = usePreset();
  const { isLoading, callback } = useLoading(async () => {
    const { data: resData } = apis?.notification?.read
      ? await ajax(
          Object.assign({}, apis.notification.read, {
            data: { ids: [id] },
          })
        )
      : { data: { code: 0 } };

    if (resData.code === 0) {
      setGlobal((notification) => {
        const newList = (notification?.list || []).slice(0);
        const index = findIndex(newList, (item) => id === item.id);
        if (index > -1) {
          newList.splice(index, 1);
        }
        return Object.assign({}, notification, { list: newList });
      });
    }
  });
  return (
    <div
      className={classnames(style["item"], className)}
      style={{ "--group-length": Math.min(groupLength, 3) || 1 }}
    >
      {groupLength &&
        groupLength > 1 &&
        range(1, Math.min(groupLength, 3))
          .reverse()
          .map((number) => (
            <div
              className={classnames(
                style["item-box"],
                style[`index-${number}`]
              )}
              key={number}
            />
          ))}
      <div className={classnames(style["item-box"], style["item-box-main"])}>
        <div
          className={classnames(style["item-title"], style[`level-${level}`])}
        >
          <Icon
            className={style["title-icon"]}
            type={level === "high" ? "icon-tishi" : "icon-daiwochuli"}
          />
          <Typography.Text ellipsis>{title}</Typography.Text>
        </div>
        <div className={style["item-content"]}>
          <div className={style["item-subtitle"]}>
            <Typography.Text ellipsis>{subtitle || ""}</Typography.Text>
            <Icon
              className={classnames(style["close-btn"], {
                [style["is-loading"]]: isLoading,
              })}
              type="icon-close-thin"
              onClick={() => {
                if (isLoading) {
                  return;
                }

                if (!id) {
                  return;
                }

                callback();
              }}
            />
          </div>
          {Array.isArray(content) ? (
            <Content list={content} labelAlign="auto" size="small" />
          ) : (
            children
          )}
        </div>
        {link && (
          <div className={style["link-outer"]}>
            <LoadingButton
              className={style["link"]}
              size="small"
              onClick={async () => {
                const { data: resData } = apis?.notification?.read
                  ? await ajax(
                      Object.assign({}, apis.notification.read, {
                        data: { ids: [id] },
                      })
                    )
                  : { data: { code: 0 } };
                if (resData.code === 0) {
                  window.open(link);
                }
              }}
            >
              查看详情
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  );
};

NotificationItem.defaultProps = {
  level: "low",
};

const Notification = () => {
  const { global: notification, setGlobal } = useGlobalContext("notification");
  const headOptionRef = useRef();
  const { apis, ajax } = usePreset();
  const [headOptionHeight, setHeadOptionHeight] = useState(32);

  useEffect(() => {
    headOptionRef.current &&
      setHeadOptionHeight(headOptionRef.current?.clientHeight);
  }, []);

  const { list, expand } = Object.assign(
    {},
    {
      expand: false,
      list: [],
    },
    notification
  );

  const groupList = useMemo(() => {
    const group = groupBy(list, (item) => item.level || "low");
    return LEVEL.map((name) => group[name] || []);
  }, [list]);

  if (list.length === 0) {
    return null;
  }

  return (
    <div
      className={style["notification"]}
      style={{
        "--head-option-height": `${headOptionHeight}px`,
      }}
    >
      <div ref={headOptionRef}>
        <Row justify="end" wrap={false} className={style["header"]} gutter={8}>
          {groupList.some((item) => item.length > 1) && (
            <Col>
              <Button
                size="small"
                onClick={() => {
                  setGlobal(
                    Object.assign({}, notification, { expand: !expand })
                  );
                }}
              >
                {expand ? "全部折叠" : "全部展开"}
              </Button>
            </Col>
          )}
          <Col>
            <LoadingButton
              type="primary"
              size="small"
              onClick={async () => {
                const { data: resData } = apis?.notification?.read
                  ? await ajax(
                      Object.assign({}, apis.notification.read, {
                        data: {
                          ids: list.map((item) => item.id).filter((id) => !!id),
                        },
                      })
                    )
                  : { data: { code: 0 } };
                if (resData.code === 0) {
                  setGlobal(Object.assign({}, notification, { list: [] }));
                }
              }}
            >
              全部清除
            </LoadingButton>
          </Col>
        </Row>
      </div>
      <SimpleBar className={style["list"]}>
        <QueueAnim leaveReverse duration={200} interval={20}>
          {groupList
            .filter((item) => item && item.length > 0)
            .map((item, groupKey) => {
              if (expand) {
                return item.map(
                  (notification, index) =>
                    notification && (
                      <div key={`group-${groupKey}-${index}`}>
                        <NotificationItem
                          {...Object.assign({}, notification)}
                        />
                      </div>
                    )
                );
              }
              const firstItem = first(item);
              return (
                <div key={`group-${groupKey}-0`}>
                  <NotificationItem
                    {...Object.assign({}, firstItem)}
                    groupLength={item.length}
                    className={classnames({
                      [style["is-last-item"]]:
                        groupList?.length &&
                        +groupKey + 1 ===
                          Math.min(
                            groupList.filter((item) => item && item.length)
                              ?.length,
                            3
                          ),
                    })}
                  />
                </div>
              );
            })}
        </QueueAnim>
      </SimpleBar>
    </div>
  );
};

export default Notification;
