import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ModalButton, { TabsModalButton } from "../ModalButton";
import { App } from "antd";

const data = [
  { label: "内容1", content: "内容1内容1内容1内容1内容1内容1内容1" },
  {
    label: "内容2",
    content: "内容2内容2内容2内容2内容2内容2内容2内容2",
  },
];

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

test("普通ModalButton", async () => {
  const TestComponent = () => {
    return (
      <ModalButton
        api={{
          loader: () => {
            return data;
          },
        }}
        modalProps={({ data }) => {
          return {
            children: (
              <div>
                <div>我是一个弹窗</div>
                <div>{data[0].label}</div>
                <div>{data[0].content}</div>
                <div>{data[1].label}</div>
                <div>{data[1].content}</div>
              </div>
            ),
          };
        }}
      >
        按钮
      </ModalButton>
    );
  };

  render(
    <App>
      <TestComponent />
    </App>
  );
  fireEvent.click(screen.getByRole("button"));
  await screen.findByText("我是一个弹窗");
  expect(screen.getByText("内容1")).toBeInTheDocument();
  expect(
    screen.getByText("内容1内容1内容1内容1内容1内容1内容1")
  ).toBeInTheDocument();
  expect(screen.getByText("内容2")).toBeInTheDocument();
  expect(
    screen.getByText("内容2内容2内容2内容2内容2内容2内容2内容2")
  ).toBeInTheDocument();
});

test("ModalButton modalProps为对象的情况", async () => {
  const TestComponent = () => {
    return (
      <ModalButton
        api={{
          loader: () => {
            return data;
          },
        }}
        modalProps={{
          children: <div>我是一个弹窗</div>,
        }}
      >
        按钮
      </ModalButton>
    );
  };

  render(
    <App>
      <TestComponent />
    </App>
  );
  fireEvent.click(screen.getByRole("button"));
  await screen.findByText("我是一个弹窗");
  expect(screen.getByText("我是一个弹窗")).toBeInTheDocument();
});

test("ModalButton api报错情况", async () => {
  const errorFn = jest.fn();
  const TestComponent = () => {
    return (
      <ModalButton
        api={{
          loader: () => {
            throw new Error("错误错误");
          },
        }}
        modalProps={{
          children: <div>我是一个弹窗</div>,
        }}
        onError={errorFn}
      >
        按钮
      </ModalButton>
    );
  };

  render(
    <App>
      <TestComponent />
    </App>
  );
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => expect(errorFn).toBeCalled());
});

test("普通TabsModalButton", async () => {
  const TestComponent = () => {
    return (
      <TabsModalButton
        api={{
          loader: () => {
            return data;
          },
        }}
        modalProps={({ data }) => {
          return {
            withDecorator: (render) => (
              <div>
                <div>我是一个弹窗</div>
                <div>{render()}</div>
              </div>
            ),
            items: data.map(({ label, content }, index) => {
              return {
                key: index,
                children: content,
                label,
              };
            }),
          };
        }}
      >
        按钮
      </TabsModalButton>
    );
  };

  render(
    <App>
      <TestComponent />
    </App>
  );
  fireEvent.click(screen.getByRole("button"));
  await screen.findByText("我是一个弹窗");
  expect(screen.getByText("内容1")).toBeInTheDocument();
  expect(screen.getByText("内容2")).toBeInTheDocument();
  expect(
    screen.getByText("内容1内容1内容1内容1内容1内容1内容1")
  ).toBeInTheDocument();
  fireEvent.click(screen.getByText("内容2"));
  expect(
    screen.getByText("内容2内容2内容2内容2内容2内容2内容2内容2")
  ).toBeInTheDocument();
});
