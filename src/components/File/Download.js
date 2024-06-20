import get from "lodash/get";
import axios from "axios";
import { App, Button } from "antd";
import { usePreset } from "@components/Global";
import Icon from "@components/Icon";
import { useFetch } from "@kne/react-fetch";
import { useEffect, useState } from "react";
import useRefCallback from "@kne/use-ref-callback";

export const downloadBlobFile = async (res, filename) => {
  const download = (url) => {
    const element = document.createElement("a"),
      event = new MouseEvent("click");
    element.download = filename; // 设置文件名称
    element.href = url; // 将生成的URL设置为a.href属性
    element.dispatchEvent(event); // 触发a的单击事件
  };

  if (!res) {
    throw new Error("未获取到下载的文件信息");
  }

  if (typeof res === "string" && /blob:http(s)?:/.test(res)) {
    download(res);
    return;
  }

  if (Object.prototype.toString.call(res) === "[object Blob]") {
    const blob = new Blob([res], {
      type: get(res, "type"),
    });
    download(URL.createObjectURL(blob));
    return;
  }

  const { data } = await axios({ url: res, responseType: "blob" });
  download(
    URL.createObjectURL(
      new Blob([data], {
        type: get(data, "type"),
      })
    )
  );
};

export const useDownload = ({
  id,
  filename,
  apis: currentApis,
  onError,
  onSuccess,
}) => {
  const { message } = App.useApp();
  const { apis: baseApis } = usePreset();
  const apis = Object.assign({}, baseApis, currentApis);
  const [downLoading, setDownLoading] = useState(false);

  const { paramsType, paramsName, ...oss } = Object.assign(
    { paramsType: "params", paramsName: "id" },
    apis.oss
  );
  const fetchProps = {};
  fetchProps[paramsType] = { [paramsName]: id };
  const { isLoading, data, error, refresh, ...otherProps } = useFetch(
    Object.assign({}, oss, fetchProps, { auto: false })
  );

  const showError = useRefCallback(onError || message.error);
  const successHandler = useRefCallback(onSuccess);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (error) {
      showError(error);
      return;
    }
    if (!data) {
      return;
    }
    setDownLoading(true);
    downloadBlobFile(data, filename)
      .then(successHandler)
      .catch((e) => {
        showError(e.message);
      })
      .then(() => {
        setDownLoading(false);
      });
  }, [isLoading, error, data, filename, showError, successHandler]);
  return {
    ...otherProps,
    isLoading: isLoading || downLoading,
    download: () => refresh(id && fetchProps),
  };
};

const Download = ({
  id,
  filename,
  api,
  onSuccess,
  onError,
  onClick,
  ...props
}) => {
  const { isLoading, download } = useDownload({
    id,
    filename,
    api,
    onError,
    onSuccess,
  });
  return (
    <Button
      icon={<Icon type="icon-xiazai" />}
      {...props}
      loading={isLoading}
      onClick={(...args) => {
        onClick && onClick(...args);
        download();
      }}
    />
  );
};

Download.defaultProps = {
  filename: "未命名下载文件",
};

Download.useDownload = useDownload;
Download.downloadBlobFile = downloadBlobFile;

export default Download;
