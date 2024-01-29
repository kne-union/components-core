const {default: Image} = _Image;
const {PureGlobal} = global;
const {Space} = antd;
const BaseExample = () => {
    return <PureGlobal preset={{
        apis: {
            oss: {
                loader: ({params}) => {
                    if(params.id ==='logo513.png'){
                        return new Promise(()=>{

                        });
                    }
                    return new Promise((resolve) => {
                        resolve(window.PUBLIC_URL + '/' + params.id);
                    });

                }
            }
        }
    }}>
        <Space>
            <Image id="logo512.png" style={{width: '100px', height: '100px'}}/>
            <Image id="logo513.png" style={{width: '100px', height: '100px'}}/>
            <Image id="logo511.png" style={{width: '100px', height: '100px'}}/>
        </Space>
    </PureGlobal>;
};

render(<BaseExample/>);
