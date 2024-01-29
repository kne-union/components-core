import Icon from "../index";
import { render, screen } from "@testing-library/react";

test("基本的icon", () => {
  render(<Icon type="icon-chuanzhaopian" />);
  const componentDOM = screen.getByTestId("components-core-iconfont");
  expect(componentDOM).toHaveClass("icon-chuanzhaopian iconfont");
});

test("colorful的icon", () => {
  render(<Icon type="error-shuangse" colorful />);
  const componentDOM = screen.getByTestId("components-core-iconfont");
  expect(componentDOM).toHaveClass("icon-color-error-shuangse iconfont--color");
});

test("prefix设置", () => {
  render(<Icon type="chuanzhaopian" prefix="prefix-" />);
  const componentDOM = screen.getByTestId("components-core-iconfont");
  expect(componentDOM).toHaveClass("prefix-chuanzhaopian iconfont");
});

test("prefix设置colorful的icon", () => {
  render(<Icon type="chuanzhaopian" colorful prefix="prefix-" />);
  const componentDOM = screen.getByTestId("components-core-iconfont");
  expect(componentDOM).toHaveClass("prefix-chuanzhaopian iconfont--color");
});

test("fontSize", () => {
  render(<Icon type="chuanzhaopian" size={24} />);
  const componentDOM = screen.getByTestId("components-core-iconfont");
  expect(componentDOM).toHaveStyle("font-size:24px");
});

test("fontSize string", () => {
  render(<Icon type="chuanzhaopian" size="24px" />);
  const componentDOM = screen.getByTestId("components-core-iconfont");
  expect(componentDOM).toHaveStyle("font-size:24px");
});