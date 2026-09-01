import { getScrollEl } from "@common/utils/importantContainer";
import { findResponsiveBoundary } from "@kne/responsive-utils";

// antd Modal/Drawer 调 getPopupContainer() 不带 trigger。若容器在 .ant-modal-root 内，
// wrap 的 position:fixed 会被外层 zoom transform 困住，弹窗从外层左上角 (0,0) 弹出。
export const hoistOutOfModalRoot = (container) => {
  if (!container || typeof container.closest !== "function") {
    return container;
  }
  const root = container.closest(".ant-modal-root");
  return (root && root.parentElement) || container;
};

const getPopupContainer = (triggerNode) => {
  if (!triggerNode) {
    return null;
  }
  const findAntdPopupContainer = (el) => {
    const currentBody = getScrollEl();
    if (!el || el === currentBody || !el.parentElement) {
      const boundary = findResponsiveBoundary(triggerNode);
      return boundary || null;
    }
    const targetEl = [].slice
      .call(el.classList, 0)
      .find(
        (className) =>
          [
            "ant-modal-body",
            "ant-modal-content",
            "ant-popover-content",
          ].indexOf(className) > -1
      );
    if (targetEl) {
      return el;
    }
    return findAntdPopupContainer(el.parentElement);
  };
  return findAntdPopupContainer(triggerNode);
};

export default getPopupContainer;
