import Image from "../index";
import { render, screen } from "@testing-library/react";

jest.mock("@kne/react-fetch", () => {
  return ({ params, error, render }) => {
    if (params.data === "/error.jpg") {
      return error;
    }
    return render({ data: params.data });
  };
});

jest.mock("@common/hocs/withOSSFile", () => {
  return (WrappedComponent) => (props) =>
    <WrappedComponent {...props} data={"/test.jpg"} />;
});

jest.mock("antd", () => {
  return {
    ...jest.requireActual("antd"),
    Avatar: ({ children, src }) => {
      if (children) {
        return children;
      }
      if (typeof src !== "string") {
        return src;
      }
      return <img src={src} />;
    },
  };
});

test("普通Image", () => {
  render(<Image src="/test.jpg" />);
  const componentDOM = screen.getByRole("img");
  expect(componentDOM).toHaveAttribute("src", "/test.jpg");
});

test("通过id加载Image", () => {
  render(<Image id="test" />);
  const componentDOM = screen.getByRole("img");
  expect(componentDOM).toHaveAttribute("src", "/test.jpg");
});

test("加载图片错误", () => {
  render(<Image src="/error.jpg" />);
  const componentDOM = screen.getByRole("error-icon");
  expect(componentDOM).toHaveClass("error");
});

test("空Image", () => {
  render(<Image />);
  const componentDOM = screen.getByRole("error-icon");
  expect(componentDOM).toHaveClass("error");
});

test("普通Avatar", () => {
  render(<Image.Avatar src="/test.jpg" />);
  const componentDOM = screen.getByRole("img");
  expect(componentDOM).toHaveAttribute("src", "/test.jpg");
});

test("id加载Avatar", () => {
  render(<Image.Avatar id="/test.jpg" />);
  const componentDOM = screen.getByRole("img");
  expect(componentDOM).toHaveAttribute("src", "/test.jpg");
});

test("性别Avatar男", () => {
  render(<Image.Avatar gender="F" />);
  const componentDOM = screen.getByRole("touxiang");
  expect(componentDOM).toHaveClass("icon-color-touxiang-nv");
});

test("性别Avatar女", () => {
  render(<Image.Avatar gender="M" />);
  const componentDOM = screen.getByRole("touxiang");
  expect(componentDOM).toHaveClass("icon-color-touxiang-nan");
});

test("文字Avatar", () => {
  render(<Image.Avatar>哈哈哈</Image.Avatar>);
  const componentDOM = screen.getByText("哈哈哈");
  expect(componentDOM).toHaveClass("img-outer");
});
