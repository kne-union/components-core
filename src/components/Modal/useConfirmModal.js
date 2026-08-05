import { App, Space } from 'antd';
import classnames from 'classnames';
import Icon from '@components/Icon';
import { useMobilePopupMount, useScrollElement } from '@kne/responsive-utils';
import style from './style.module.scss';

const wrapCustomGetContainer = customGetContainer => {
  if (!customGetContainer) {
    return undefined;
  }
  if (typeof customGetContainer === 'function') {
    return triggerNode => customGetContainer(triggerNode) || null;
  }
  return () => customGetContainer;
};

let parentScrollLockCount = 0;
let parentScrollLocked = [];

const lockParentScroll = getScrollElement => {
  parentScrollLockCount += 1;
  if (parentScrollLockCount === 1) {
    const targets = [document.body];
    const scrollEl = typeof getScrollElement === 'function' ? getScrollElement() : null;
    if (scrollEl && scrollEl !== document.body && !targets.includes(scrollEl)) {
      targets.push(scrollEl);
    }
    parentScrollLocked = targets.map(el => {
      const prev = {
        overflow: el.style.overflow,
        overscrollBehavior: el.style.overscrollBehavior
      };
      el.style.overflow = 'hidden';
      el.style.overscrollBehavior = 'none';
      return { el, prev };
    });
  }
  return () => {
    parentScrollLockCount = Math.max(0, parentScrollLockCount - 1);
    if (parentScrollLockCount === 0) {
      parentScrollLocked.forEach(({ el, prev }) => {
        el.style.overflow = prev.overflow;
        el.style.overscrollBehavior = prev.overscrollBehavior;
      });
      parentScrollLocked = [];
    }
  };
};

export const useConfirmModal = () => {
  const { modal } = App.useApp();
  const { resolveMount, getPopupContainer } = useMobilePopupMount({ cover: 'viewport' });
  const getScrollElement = useScrollElement();
  return props => {
    const anchor = typeof document !== 'undefined' ? document.activeElement : null;
    const { isMobile, fixedModeClass } = resolveMount(anchor);
    const unlock = lockParentScroll(getScrollElement);
    const api = {};
    const {
      type,
      icon,
      title,
      danger,
      wrapClassName,
      message,
      iconSetting = {},
      confirmType = 'info',
      afterClose: userAfterClose,
      getContainer: customGetContainer,
      ...otherProps
    } = {
      onClose: () => api.close(),
      maskClosable: false,
      ...props
    };
    const typeEnum = Object.assign(
      {},
      {
        info: 'icon-xinxi-tianchong',
        confirm: 'icon-tishi-tianchong',
        warning: 'icon-tishi-tianchong',
        error: 'icon-shibai',
        success: 'icon-chenggong'
      },
      iconSetting
    );
    if (modal[type]) {
      const resolveContainer = wrapCustomGetContainer(customGetContainer);
      const { destroy } = modal[type]({
        ...otherProps,
        getContainer: () =>
          (resolveContainer ? resolveContainer(anchor) : null) || getPopupContainer(anchor),
        centered: true,
        afterClose: (...args) => {
          unlock();
          userAfterClose && userAfterClose(...args);
        },
        icon: null,
        classNames: {
          mask: classnames(isMobile && style['modal-mask-fullscreen'], isMobile && fixedModeClass)
        },
        wrapClassName: classnames(style['confirm-modal-wrap'], wrapClassName, {
          [style['is-danger']]: danger,
          [style['is-mobile']]: isMobile,
          [style['modal-wrap-centered']]: isMobile,
          [fixedModeClass]: isMobile
        }),
        title: (
          <Space
            orientation="vertical"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {title && (
              <Space size={0} align="start" className={style['title']}>
                {danger ? (
                  <Icon
                    className={classnames(
                      'title-icon',
                      `title-icon-${type === 'confirm' ? confirmType : type}`
                    )}
                    type={icon || typeEnum[type === 'confirm' ? confirmType : type]}
                  />
                ) : null}
                {title}
              </Space>
            )}
          </Space>
        ),
        content: (
          <Space
            size={0}
            align="start"
            className={classnames(style['content'], {
              [style['has-title']]: title
            })}
          >
            {!title && danger ? (
              <Icon
                className={classnames(
                  'title-icon',
                  `title-icon-${type === 'confirm' ? confirmType : type}`
                )}
                type={icon || typeEnum[type === 'confirm' ? confirmType : type]}
              />
            ) : null}
            {message}
          </Space>
        )
      });
      api.close = destroy;
    } else {
      unlock();
    }
    return api;
  };
};

export default useConfirmModal;
