import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoadingButton from "../index";

test("加载状态切换", async () => {
  const callback = jest.fn();
  render(
    <LoadingButton
      onClick={() => {
        const promise = new Promise((resolve) => {
          resolve();
        });
        promise.then(callback);
        return promise;
      }}
    >
      按钮
    </LoadingButton>
  );
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(button).toHaveClass("ant-btn-loading");
  await waitFor(() => expect(callback).toBeCalled());
  expect(button).not.toHaveClass("ant-btn-loading");
});

test("children根据loading状态切换", async () => {
  const callback = jest.fn();
  render(
    <LoadingButton
      onClick={() => {
        const promise = new Promise((resolve) => {
          resolve();
        });
        promise.then(callback);
        return promise;
      }}
    >
      {(loading) => (loading ? "加载中" : "一个按钮")}
    </LoadingButton>
  );
  const button = screen.getByRole("button");
  expect(screen.getByText("一个按钮")).toBeInTheDocument();
  fireEvent.click(button);
  expect(screen.getByText("加载中")).toBeInTheDocument();
  await waitFor(() => expect(callback).toBeCalled());
  expect(screen.getByText("一个按钮")).toBeInTheDocument();
});
