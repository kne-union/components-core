import Highlight, { HighlightProvider } from "../index";
import { render, screen } from "@testing-library/react";

test("基础的 Highlight", () => {
  render(
    <HighlightProvider list={["哈", "呃呃"]}>
      <Highlight>哈哈哈西西西西呃呃呃</Highlight>
    </HighlightProvider>
  );

  const componentDOM = screen.getByTestId("components-core-highlight");
  expect(componentDOM).toBeInTheDocument();
});

test("没有 Highlight List", () => {
  render(
    <HighlightProvider caseSensitive={false}>
      <Highlight>哈哈哈西西西西呃呃呃</Highlight>
    </HighlightProvider>
  );

  const componentDOM = screen.getByTestId("components-core-highlight");
  expect(componentDOM).toBeInTheDocument();
});

test("没有 Children", () => {
  render(
    <HighlightProvider>
      <Highlight></Highlight>
    </HighlightProvider>
  );

  const componentDOM = screen.getByTestId("components-core-highlight");
  expect(componentDOM).toBeInTheDocument();
});
