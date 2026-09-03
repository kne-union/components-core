import { findResponsiveBoundary, hoistOutOfModalRoot, resolvePopupContainer } from "@kne/responsive-utils";
import { getScrollEl } from "@common/utils/importantContainer";

export { hoistOutOfModalRoot };

/**
 * @deprecated 优先用 `usePopupMount().getPopupContainer`。
 * 无 React 上下文时的 DOM 兜底（仍走统一 resolvePopupContainer）。
 */
const getPopupContainer = triggerNode => {
  return resolvePopupContainer({
    triggerNode,
    getBoundaryElement: () =>
      findResponsiveBoundary(triggerNode) ||
      getScrollEl() ||
      (typeof document !== "undefined" ? document.body : null)
  });
};

export default getPopupContainer;
