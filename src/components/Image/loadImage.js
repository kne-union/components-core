const loadImage = ({ params }) => {
  const { data } = params;
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.src = data;
    image.addEventListener("load", () => {
      resolve(data);
    });
    image.addEventListener("error", (e) => {
      reject(e);
    });
  });
};

export default loadImage;
