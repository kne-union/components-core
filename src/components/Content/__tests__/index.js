import { useState } from "react";
import Content from "../index";
import { fireEvent, render, screen } from "@testing-library/react";

class ResizeObserver {
  constructor(fn) {
    this.fn = fn;
  }

  observe = jest.fn();
  disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserver;
global.matchMedia = () => {
  return { addListener: jest.fn(), removeListener: jest.fn() };
};

test("正常的content", () => {
  render(
    <Content
      list={[
        { label: "标题", content: "内容" },
        { label: "标题标题", content: "内容内容" },
      ]}
    />
  );
  expect(screen.getByTestId("components-core-content")).toBeInTheDocument();
});

test("含有block的content", () => {
  render(
    <Content
      list={[
        { label: "标题", content: "内容", block: true },
        {
          label: "标题标题",
          content: "内容内容",
        },
      ]}
    />
  );
  expect(screen.getByTestId("components-core-content")).toBeInTheDocument();
});

test("含有display的content", () => {
  render(
    <Content
      list={[
        { label: "标题", content: "内容", display: () => false },
        {
          label: "标题标题",
          content: "内容内容",
        },
      ]}
    />
  );
  expect(screen.getByTestId("components-core-content")).toBeInTheDocument();
});

test("label不存在的content", () => {
  render(
    <Content
      list={[
        { content: "内容" },
        {
          label: "标题标题",
          content: "内容内容",
        },
      ]}
    />
  );
  expect(screen.getByTestId("components-core-content")).toBeInTheDocument();
});

test("label重新计算", async () => {
  const TestComponent = () => {
    const [loaded, setLoaded] = useState(true);
    return (
      <div>
        <Content
          list={
            loaded
              ? [{ label: "标题", content: "内容" }]
              : [
                  {
                    label: "标题",
                    content: "内容",
                    block: true,
                  },
                  {
                    label: "新的测试标题标题",
                    content: "新的测试内容",
                  },
                ]
          }
        />
        <button
          onClick={() => {
            setLoaded((loaded) => !loaded);
          }}
        >
          触发加载
        </button>
      </div>
    );
  };

  render(<TestComponent />);
  fireEvent.click(screen.getByRole("button"));
  await screen.findByText("新的测试内容");
  expect(screen.getByTestId("components-core-content")).toBeInTheDocument();
});

test("labelAlign auto的content", () => {
  render(
    <Content
      labelAlign="auto"
      list={[
        { label: "标题", content: "内容" },
        {
          label: "标题标题",
          content: "内容内容",
        },
      ]}
    />
  );
  expect(screen.getByTestId("components-core-content")).toBeInTheDocument();
});
