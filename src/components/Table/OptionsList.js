import { Button, Dropdown, Space } from "antd";
import classnames from "classnames";
import { startTransition, useState } from "react";
import Icon from "@components/Icon";
import LoadingButton from "@components/LoadingButton";
import useResize from "@common/hooks/useResize";
import style from "./style.module.scss";

const OptionsList = ({ className, list, width }) => {
  const [showLength, setShowLength] = useState(list.length);
  const computedLength = () => {
    const el = targetRef.current;
    const buttonEls = el.querySelectorAll(".option-item"),
      buttonElLength = buttonEls.length;
    const amountWidth = ref.current.clientWidth,
      moreBtnWidth = 32,
      spaceWidth = 8;
    let targetLength = 0,
      targetWidth = 0,
      buttonWidthList = [].map.call(buttonEls, (el) => el.offsetWidth);
    // 采取先加后减策略
    while (
      amountWidth >=
        targetWidth +
          buttonWidthList[targetLength] +
          targetLength * spaceWidth &&
      targetLength < buttonElLength
    ) {
      targetWidth += buttonWidthList[targetLength];
      targetLength += 1;
    }

    while (
      amountWidth <
        targetWidth +
          (targetLength - 1) * spaceWidth +
          (targetLength < buttonElLength ? moreBtnWidth + spaceWidth : 0) &&
      targetLength > 0
    ) {
      targetWidth -= buttonWidthList[targetLength - 1];
      targetLength -= 1;
    }
    startTransition(() => {
      setShowLength(targetLength);
    });
  };

  const ref = useResize(computedLength);
  const targetRef = useResize(computedLength);

  const otherList = list.slice(showLength);

  return (
    <div
      className={classnames(className)}
      style={{
        "--max-width": width + "px",
      }}
    >
      <div ref={ref}>
        <div
          style={{
            width: 0,
            height: 0,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute" }} ref={targetRef}>
            <Space>
              {list.map(({ className, ...props }, index) => (
                <LoadingButton
                  {...props}
                  key={index}
                  className={classnames(
                    "option-item",
                    "btn-no-padding",
                    style["options-btn"],
                    className
                  )}
                  type="link"
                />
              ))}
            </Space>
          </div>
        </div>
        <Space>
          {list.slice(0, showLength).map(({ className, ...props }, index) => (
            <LoadingButton
              {...props}
              key={index}
              className={classnames(
                "btn-no-padding",
                style["options-btn"],
                className
              )}
              type="link"
            />
          ))}
          {otherList.length > 0 && (
            <Dropdown
              menu={{
                items: otherList.map(({ children, ...props }, key) => ({
                  ...props,
                  key,
                  label: children,
                })),
              }}
            >
              <Button
                icon={<Icon type="icon-gengduo2" />}
                className="btn-no-padding"
                type="link"
              />
            </Dropdown>
          )}
        </Space>
      </div>
    </div>
  );
};

export default OptionsList;
