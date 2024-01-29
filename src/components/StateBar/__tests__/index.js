import StateBar from "../index";
import { render, screen } from "@testing-library/react";

const stateOption = [
  { tab: "全部", key: "1" },
  { tab: "科目一", key: "2" },
  {
    tab: "科目二",
    key: "3",
  },
  { tab: "科目三", key: "4" },
  { tab: "科目四", key: "5" },
];

test("基础的stateBar", () => {
  render(<StateBar stateOption={stateOption} />);

  const componentDOM = screen.getByTestId("components-core-state-bar");
  expect(componentDOM).toBeInTheDocument();
});

test("inner stateBar", () => {
  render(<StateBar isInner stateOption={stateOption} />);

  const componentDOM = screen.getByTestId("components-core-state-bar");
  expect(componentDOM).toBeInTheDocument();
});

test("step stateBar", () => {
  render(<StateBar type="step" stateOption={stateOption} />);

  const componentDOM = screen.getByTestId("components-core-state-bar");
  expect(componentDOM).toBeInTheDocument();
});

test("radio stateBar", () => {
  render(<StateBar type="radio" stateOption={stateOption} />);

  const componentDOM = screen.getByTestId("components-core-state-bar");
  expect(componentDOM).toBeInTheDocument();
});

test("带有 ExtraContent 的 stateBar", () => {
  render(
    <StateBar
      type="radio"
      stateOption={stateOption}
      tabBarExtraContent={<div>ExtraContent</div>}
    />
  );

  const componentDOM = screen.getByTestId("components-core-state-bar");
  expect(componentDOM).toBeInTheDocument();
});

test("文案字段名为 label 的 stateBar", () => {
  render(
    <StateBar
      type="radio"
      stateOption={[
        { label: "全部", key: "1" },
        { label: "科目一", key: "2" },
        { label: "科目二", key: "3" },
        { label: "科目三", key: "4" },
        { label: "科目四", key: "5" },
      ]}
      tabBarExtraContent={<div>ExtraContent</div>}
    />
  );

  const componentDOM = screen.getByTestId("components-core-state-bar");
  expect(componentDOM).toBeInTheDocument();
});

test("没有 type 的 stateBar", () => {
  render(<StateBar stateOption={stateOption} />);

  const componentDOM = screen.getByTestId("components-core-state-bar");
  expect(componentDOM).toBeInTheDocument();
});

test("没有 stateOption 的 stateBar", () => {
  render(<StateBar type="radio" />);

  const componentDOM = screen.getByTestId("components-core-state-bar");
  expect(componentDOM).toBeInTheDocument();
});
