const {default: FilePreview} = _FilePreview;
const {getPublicPath} = remoteLoader;
const {PureGlobal} = _Global;
const BaseExample = () => {
    return (
        <PureGlobal
            preset={{
                apis: {
                    file: {
                        getUrl: {
                            loader:()=>{
                                return "http://ieee802.org:80/secmail/docIZSEwEqHFr.doc";
                            },
                        },
                    },
                },
            }}
        >
            <FilePreview
                id="63bb2013-c743-4d2d-9d91-935c865f1c4d"
                originName="docIZSEwEqHFr.doc"
            />
        </PureGlobal>
    );
};

render(<BaseExample/>);
