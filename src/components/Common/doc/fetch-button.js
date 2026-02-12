const {FetchButton} = _Common;
const {Typography, App} = _antd;

const {useModal} = _Modal;

const BaseExample = () => {
    const modal = useModal();

    return (<FetchButton
        api={{
            loader: () => {
                return [{id: 1, name: "前端开发组", count: 8, description: "负责所有前端页面开发"}, {
                    id: 2,
                    name: "后端开发组",
                    count: 12,
                    description: "负责 API 和服务器开发"
                }, {id: 3, name: "测试组", count: 5, description: "负责功能测试和质量保证"}, {
                    id: 4,
                    name: "运维组",
                    count: 3,
                    description: "负责系统部署和维护"
                },];
            },
        }}
        modalProps={(contextProps) => {
            const {data, fetchApi} = contextProps;
            return {
                title: "团队信息", children: (<div>
                    <Typography.Paragraph>当前项目团队构成：</Typography.Paragraph>
                    {data.map((item) => (<div key={item.id} style={{marginBottom: 16}}>
                        <Typography.Text strong style={{fontSize: 15}}>
                            {item.name}
                        </Typography.Text>
                        <div style={{marginTop: 4, color: '#666'}}>
                            <Typography.Text>人数：{item.count} 人</Typography.Text>
                            <Typography.Text style={{marginLeft: 16}}>
                                说明：{item.description}
                            </Typography.Text>
                        </div>
                    </div>))}
                </div>),
            };
        }}
        modalFunc={modal}
    >
        查看团队信息
    </FetchButton>);
};

render(<BaseExample/>);
