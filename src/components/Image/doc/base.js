const {default: Image} = _Image;
const BaseExample = () => {
    return <Image src={window.PUBLIC_URL + "/logo512.png"} style={{width: '100px', height: '100px'}}/>;
};

render(<BaseExample/>);
