import { preset as remoteLoaderPreset } from "@kne/remote-loader";
import { preset as fetchPreset } from "@kne/react-fetch";
import axios from "axios";
import { Empty, Result, Spin } from "antd";
import monacoLoader from "@monaco-editor/loader";

window.PUBLIC_URL = process.env.PUBLIC_URL;

monacoLoader.config({
  paths: {
    vs: "https://uc.fatalent.cn/packages/monaco-editor/0.48.0/min/vs",
  },
});

const remote =
  process.env.NODE_ENV === "development"
    ? {
        remote: "components-core",
        url: "/",
        tpl: "{{url}}",
        defaultVersion: process.env.DEFAULT_VERSION,
      }
    : {
        remote: "components-core",
        url: "https://registry.npmmirror.com",
        tpl: "{{url}}/@kne%2f{{remote}}/{{version}}/files/build",
        defaultVersion: process.env.DEFAULT_VERSION,
      };

remoteLoaderPreset({
  remotes: {
    default: remote,
    "components-core": remote,
    "components-iconfont": {
      remote: "components-iconfont",
      url: "https://uc.fatalent.cn",
      tpl: "{{url}}/packages/@kne-components/{{remote}}/{{version}}/build",
      defaultVersion: "0.2.0",
    },
  },
});

export const ajax = axios.create({
  validateStatus: function () {
    return true;
  },
});

fetchPreset({
  ajax,
  loading: (
    <Spin
      style={{
        position: "absolute",
        left: "50%",
        padding: "10px",
        transform: "translateX(-50%)",
      }}
    />
  ),
  error: <Result status="error" title="请求发生错误" />,
  empty: <Empty />,
  transformResponse: (response) => {
    const { data } = response;
    response.data = {
      code: data.code === 0 ? 200 : data.code,
      msg: data.msg,
      results: data.data,
    };
    return response;
  },
});
