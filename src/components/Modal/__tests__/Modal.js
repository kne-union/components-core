import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import Modal, { useModal } from "../Modal";
import { App } from "antd";

global.matchMedia = () => {
  return { addListener: jest.fn(), removeListener: jest.fn() };
};

jest.mock("@components/Intl", () => {
  return {
    IntlProvider: ({ children }) => {
      return children;
    },
  };
});

test("弹出正常Modal", async () => {
  const closeFn = jest.fn();
  const cancelFn = jest.fn();
  const TestComponent = () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          点击
        </button>
        <Modal
          open={open}
          title="弹窗title"
          onClose={() => {
            setOpen(false);
          }}
          afterClose={closeFn}
          rightOptions={<div>右侧内容</div>}
          footerButtons={[
            {
              children: "取消",
              onClick: cancelFn,
            },
            {
              type: "primary",
              children: "确定",
            },
            { children: "其他按钮" },
            { buttonType: "xxxx", children: "错误buttonType按钮" },
          ]}
        >
          我是一个弹窗
        </Modal>
      </div>
    );
  };

  render(<TestComponent />);
  fireEvent.click(screen.getByRole("button"));
  await screen.findByText("我是一个弹窗");
  expect(screen.getByText("右侧内容")).toBeInTheDocument();
  expect(screen.getByText("其他按钮")).toBeInTheDocument();
  expect(screen.getByText("弹窗title")).toBeInTheDocument();
  const modalDom = screen.getByTestId("components-core-modal");
  expect(modalDom).toBeInTheDocument();
  fireEvent.click(screen.getByText("取 消"));
  expect(cancelFn).toBeCalled();
  await waitFor(() => expect(closeFn).toBeCalled());
  expect(modalDom).not.toBeInTheDocument();
});

test("没有rightOptions并且hooks调用的弹窗", async () => {
  const TestComponent = () => {
    const modal = useModal();
    return (
      <button
        onClick={() => {
          modal({
            children: <div>我是弹窗</div>,
          });
        }}
      >
        点击
      </button>
    );
  };
  render(
    <App>
      <TestComponent />
    </App>
  );
  fireEvent.click(screen.getByRole("button"));
  const modalDom = screen.getByTestId("components-core-modal");
  expect(modalDom).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("components-core-modal-close-btn"));
  expect(modalDom).not.toBeInTheDocument();
});

test("没有footer的hooks调用弹窗", async () => {
  const TestComponent = () => {
    const modal = useModal();
    return (
      <button
        onClick={() => {
          modal({
            footer: null,
            children: <div>我是弹窗</div>,
          });
        }}
      >
        点击
      </button>
    );
  };
  render(
    <App>
      <TestComponent />
    </App>
  );
  fireEvent.click(screen.getByRole("button"));
  const modalDom = screen.getByTestId("components-core-modal");
  expect(modalDom).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("components-core-modal-close-btn"));
  expect(modalDom).not.toBeInTheDocument();
});

test("没有关闭按钮弹窗", () => {
  const TestComponent = () => {
    const modal = useModal();
    return (
      <button
        onClick={() => {
          modal({
            footer: null,
            size: "small",
            footerButtons: [],
            children: <div>我是弹窗</div>,
            closable: false,
          });
        }}
      >
        点击
      </button>
    );
  };
  render(
    <App>
      <TestComponent />
    </App>
  );
  fireEvent.click(screen.getByRole("button"));
  const modalDom = screen.getByTestId("components-core-modal");
  expect(modalDom).toBeInTheDocument();
});

test("withDecorator弹窗", async () => {
  const TestComponent = () => {
    const modal = useModal();
    return (
      <button
        onClick={() => {
          modal({
            maskClosable: false,
            size: "large",
            withDecorator: (render) => (
              <div>
                <div>外层内容</div>
                {render({ content: "内层内容" })}
              </div>
            ),
            children: ({ content }) => (
              <div>
                <div>我是弹窗</div>
                <div>{content}</div>
              </div>
            ),
            closable: false,
          });
        }}
      >
        点击
      </button>
    );
  };
  render(
    <App>
      <TestComponent />
    </App>
  );
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByTestId("components-core-modal")).toBeInTheDocument();
  expect(screen.getByText("外层内容")).toBeInTheDocument();
  expect(screen.getByText("内层内容")).toBeInTheDocument();
});

//fireEvent.click(screen.getByText("components-core-modal-close-btn"));
