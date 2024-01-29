import StateTag from "../index";
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

test("待XX，暂停的 StateTag", () => {
  render(<StateTag type="info" text={"待提交开票"} />);

  const componentDOM = screen.getByTestId("components-core-state-tag");
  expect(componentDOM).toBeInTheDocument();
  expect(componentDOM).toHaveTextContent("待提交开票");
});

test("type 为 default 的 StateTag", () => {
  render(<StateTag type="default" text={"撤销开票审核"} />);

  const componentDOM = screen.getByTestId("components-core-state-tag");
  expect(componentDOM).toBeInTheDocument();
  expect(componentDOM).toHaveTextContent("撤销开票审核");
});

test("不传 type StateTag", () => {
  render(<StateTag text={"撤销开票审核"} />);

  const componentDOM = screen.getByTestId("components-core-state-tag");
  expect(componentDOM).toBeInTheDocument();
  expect(componentDOM).toHaveTextContent("撤销开票审核");
});

test("技能标签的 StateTag", () => {
  render(
    <StateTag
      type="skill"
      text={"技能标签"}
      showBorder
      showBackground={false}
    />
  );

  const componentDOM = screen.getByTestId("components-core-state-tag");
  expect(componentDOM).toBeInTheDocument();
  expect(componentDOM).toHaveTextContent("技能标签");
});

test("下拉菜单、弹窗中已选结果标签", () => {
  render(
    <StateTag
      text={"技能标签"}
      type={"result"}
      showBackground={false}
      closable
      onClose={() => console.log("close")}
    />
  );

  const componentDOM = screen.getByTestId("components-core-state-tag");
  expect(componentDOM).toBeInTheDocument();
  expect(componentDOM).toHaveTextContent("技能标签");
});

test("筛选组件中筛选结果标签", () => {
  render(
    <StateTag
      filterName={"BD"}
      text={"陈枫林，王晓晨"}
      type={"filterResult"}
      closable
      onClose={() => console.log("close")}
    />
  );

  const componentDOM = screen.getByTestId("components-core-state-tag");
  expect(componentDOM).toBeInTheDocument();
});
