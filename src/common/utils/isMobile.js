const isMobile = () => {
  return /iPhone|iPod|Android|ios|iPad/i.test(navigator.userAgent);
};

export default isMobile;
