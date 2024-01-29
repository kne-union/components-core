import { preset as remoteLoaderPreset } from "@kne/remote-loader";
import { preset as fetchPreset } from "@kne/react-fetch";
import axios from "axios";
import { Empty, Result, Spin } from "antd";

window.PUBLIC_URL = window.runtimePublicPath || process.env.PUBLIC_URL;
window.STATIC_BASE_URL =
  window.runtimeStaticBaseUrl || "http://uc.dev.fatalent.cn";
window.ICONFONT_URL =
  (window.runtimeStaticBaseUrl || "http://uc.dev.fatalent.cn") + "/iconfont";

remoteLoaderPreset({
  remotes: {
    default: {
      remote: "components-core",
      url: window.STATIC_BASE_URL,
      defaultVersion: "1.0.0",
    },
    "components-function": {
      remote: "components-function",
      url: window.STATIC_BASE_URL,
      defaultVersion: process.env.EXCEED_COMPONENTS_VERSION,
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
