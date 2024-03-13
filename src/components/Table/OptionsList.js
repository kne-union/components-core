import { Button, Dropdown, Space } from "antd";
import classnames from "classnames";
import { startTransition, useState } from "react";
import Icon from "@components/Icon";
import LoadingButton from "@components/LoadingButton";
import ConfirmButton, { ConfirmText } from "@components/ConfirmButton";
import { useConfirmModal } from "@components/Modal";
import useResize from "@common/hooks/useResize";
import style from "./style.module.scss";

const OptionsList = ({ className, list, width }) => {
  const [showLength, setShowLength] = useState(list.length);
  const confirmModal = useConfirmModal();
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

  const renderButton = ({ className, confirm, ...props }, index) => {
    const isConfirm = confirm || props.message;
    const CurrentButton = isConfirm ? ConfirmButton : LoadingButton;
    return (
      <CurrentButton
        danger={isConfirm && props.isDelete !== false}
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
    );
  };

  return (
    <div
      className={classnames(className)}
      style={{
        "--max-width": width + "px",
      }}
    >
      <div className={style["options-width-container"]} ref={ref} />
      <div className={style["options-hidden-container"]}>
        <div className={style["options-hidden-inner"]} ref={targetRef}>
          <Space>{list.map(renderButton)}</Space>
        </div>
      </div>
      <Space>
        {list.slice(0, showLength).map(renderButton)}
        {otherList.length > 0 && (
          <Dropdown
            menu={{
              items: otherList.map(
                (
                  {
                    children,
                    confirm,
                    message,
                    onClick,
                    title,
                    isDelete,
                    okText,
                    ...props
                  },
                  key
                ) => ({
                  ...props,
                  key,
                  label: children,
                  onClick: () => {
                    confirmModal({
                      danger: isDelete !== false,
                      type: "confirm",
                      title,
                      message: message || "确定要删除吗?",
                      onOk: onClick,
                      okText: okText || (isDelete !== false && "删除"),
                    });
                  },
                })
              ),
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
  );
};

export default OptionsList;
