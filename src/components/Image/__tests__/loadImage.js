import loadImage from "../loadImage";

const addEventListener = jest.fn();

class Image {
  addEventListener = (type, callback) => {
    addEventListener();
    callback();
  };
}

global.Image = Image;

test("加载图片", () => {
  loadImage({ params: { data: "/test.jpg" } });
  expect(addEventListener).toBeCalledTimes(2);
});