import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import TabsModal, { useTabsModal } from "../TabsModal";
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

test("普通的tabsModal", async () => {
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
        <TabsModal
          open={open}
          title="弹窗title"
          onClose={() => {
            setOpen(false);
          }}
          items={[
            {
              key: "tab1",
              label: "标签1",
              children: <div>内容1</div>,
            },
            {
              key: "tab2",
              label: "标签2",
              children: <div>内容2</div>,
            },
          ]}
        />
      </div>
    );
  };

  render(<TestComponent />);
  fireEvent.click(screen.getByRole("button"));
  await screen.findByText("标签1");
  expect(screen.getByText("内容1")).toBeInTheDocument();
  fireEvent.click(screen.getByText("标签2"));
  expect(screen.getByText("内容2")).toBeInTheDocument();
});

test("hooks调用的withDecorator tabsModal弹窗", async () => {
  const TestComponent = () => {
    const tabsModal = useTabsModal();
    return (
      <button
        onClick={() => {
          tabsModal({
            withDecorator: (render) => (
              <div>
                <div>外层内容</div>
                <div>{render({ des: "内层内容" })}</div>
              </div>
            ),
            items: [
              {
                key: "tab1",
                label: "标签1",
                children: ({ content, des }) => (
                  <div>
                    <div>{des}</div>
                    <div>内容1</div>
                    <div>{content}</div>
                  </div>
                ),
                withDecorator: (render) => (
                  <div>
                    <div>标签1外层内容</div>
                    <div>{render({ content: "标签1内层内容" })}</div>
                  </div>
                ),
              },
              {
                key: "tab2",
                label: "标签2",
                children: <div>内容2</div>,
              },
            ],
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
  await screen.findByText("标签1");
  expect(screen.getByText("内容1")).toBeInTheDocument();
  expect(screen.getByText("外层内容")).toBeInTheDocument();
  expect(screen.getByText("内层内容")).toBeInTheDocument();
  expect(screen.getByText("标签1外层内容")).toBeInTheDocument();
  expect(screen.getByText("标签1内层内容")).toBeInTheDocument();
});
