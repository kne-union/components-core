import Modal, { useModal } from "./Modal";
import { Tabs } from "antd";
import classnames from "classnames";

const computedCommonProps = ({
  items,
  className,
  activeKey,
  withDecorator,
  defaultActiveKey,
  onChange,
  ...props
}) => {
  return {
    ...props,
    className: classnames(className, "tabs-modal"),
    withDecorator: (render) => {
      const innerRender = (props) => (
        <Tabs
          items={items.map(({ withDecorator: itemWithDecorator, ...item }) => {
            return Object.assign({}, item, {
              children:
                typeof itemWithDecorator === "function"
                  ? itemWithDecorator((innerProps) =>
                      render(
                        Object.assign({}, props, innerProps, {
                          children: item.children,
                        })
                      )
                    )
                  : render(
                      Object.assign({}, props, { children: item.children })
                    ),
            });
          })}
          destroyInactiveTabPane
          activeKey={activeKey}
          defaultActiveKey={defaultActiveKey}
          onChange={onChange}
        />
      );
      return typeof withDecorator === "function"
        ? withDecorator(innerRender)
        : innerRender();
    },
    children: ({ children, ...props }) => {
      return typeof children === "function" ? children(props) : children;
    },
  };
};

const TabsModal = (props) => {
  return <Modal {...computedCommonProps(props)} />;
};

export default TabsModal;

export const useTabsModal = () => {
  const modal = useModal();
  return (props) => modal(computedCommonProps(props));
};
