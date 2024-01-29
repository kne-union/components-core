import { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import Global, { PureGlobal, useGlobalContext, usePreset } from "../index";

jest.mock("@kne/react-fetch", () => {
  return {
    withFetch: (WrappedComponent) => (props) => <WrappedComponent {...props} data={{
      "en-US": {}, "zh-CN": {}
    }} />
  };
});

test("正常状态", async () => {
  render(<Global>正常渲染状态</Global>);
  expect(screen.getByText("正常渲染状态")).toBeInTheDocument();
});

test("错误状态", async () => {
  const ErrorThrowComponent = () => {
    throw new Error("错误信息");
    return <div>错误组件</div>;
  };
  render(<Global><ErrorThrowComponent /></Global>);
  expect(screen.getByText("程序出现异常，请刷新后重试")).toBeInTheDocument();
});

test("测试usePreset", async () => {
  const ChildrenComponent = () => {
    const preset = usePreset();
    return <div>{preset.test}</div>;
  };
  const TestGlobal = () => {
    return <PureGlobal preset={{ test: "test-global" }}>
      <ChildrenComponent />
    </PureGlobal>;
  };
  render(<TestGlobal />);
  expect(screen.getByText("test-global")).toBeInTheDocument();
});

test("测试useGlobalContext,globalKey存在", async () => {
  const ChildrenComponent = () => {
    const { global, setGlobal } = useGlobalContext("test-module");
    useEffect(() => {
      setGlobal("test-module-effect");
    }, []);
    return <div>{global}</div>;
  };
  const TestGlobal = () => {
    return <PureGlobal>
      <ChildrenComponent />
    </PureGlobal>;
  };
  render(<TestGlobal />);
  await screen.findByText("test-module-effect");
  expect(screen.getByText("test-module-effect")).toBeInTheDocument();
});

test("测试useGlobalContext,globalKey存在,setGlobal为function类型", async () => {
  const ChildrenComponent = () => {
    const { global, setGlobal } = useGlobalContext("test-module");
    useEffect(() => {
      setGlobal(() => "test-module-effect");
    }, []);
    return <div>{global}</div>;
  };
  const TestGlobal = () => {
    return <PureGlobal>
      <ChildrenComponent />
    </PureGlobal>;
  };
  render(<TestGlobal />);
  await screen.findByText("test-module-effect");
  expect(screen.getByText("test-module-effect")).toBeInTheDocument();
});

test("测试useGlobalContext,globalKey不存在", async () => {
  const ChildrenComponent = () => {
    const { global, setGlobal } = useGlobalContext();
    useEffect(() => {
      setGlobal({
        "test-module": "test-module-effect"
      });
    }, []);
    return <div>{global["test-module"]}</div>;
  };
  const TestGlobal = () => {
    return <PureGlobal>
      <ChildrenComponent />
    </PureGlobal>;
  };
  render(<TestGlobal />);
  await screen.findByText("test-module-effect");
  expect(screen.getByText("test-module-effect")).toBeInTheDocument();
});