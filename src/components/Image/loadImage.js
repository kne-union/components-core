import { usePreset } from "@components/Global";

const loadImage = ({ params, staticUrl: staticUrlProps }) => {
  const { data } = params;
  const { staticUrl: staticUrlBase } = usePreset();
  const staticUrl = staticUrlProps || staticUrlBase || "";
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.src = /^https?:\/\//.test(data) ? data : staticUrl + data;
    image.addEventListener("load", () => {
      resolve(image.src);
    });
    image.addEventListener("error", (e) => {
      reject(e);
    });
  });
};

export default loadImage;
