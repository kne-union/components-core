import { preset as remoteLoaderPreset } from "@kne/remote-loader";
import { preset as fetchPreset } from "@kne/react-fetch";
import axios from "axios";
import { Empty, Result, Spin } from "antd";

window.PUBLIC_URL = process.env.PUBLIC_URL;
window.ICONFONT_URL = "http://uc.dev.fatalent.cn/iconfont";

const remote = {
  remote: "components-core",
  url: "https://registry.npmmirror.com",
  tpl: "{{url}}/@kne%2f{{remote}}/{{version}}/files/build",
  defaultVersion: process.env.DEFAULT_VERSION,
};

remoteLoaderPreset({
  remotes: {
    default: remote,
    "components-core": remote,
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
