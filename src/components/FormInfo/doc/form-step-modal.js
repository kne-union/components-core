const {default: FormInfo, useFormStepModal, fields} = _FormInfo;
const {PureGlobal} = global;
const {Button, Space, Card, Tag, Divider} = antd;
const {useModal} = _Modal;

const {Input, DatePicker, Select, TextArea, PhoneNumber} = fields;

const RecruitmentStepModal = () => {
    const modal = useFormStepModal();
    const handleOpenRecruitment = () => {
        const modalApi = modal({
            title: "人才招聘流程", items: [{
                title: "基本信息", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex}) => {
                        console.log("基本信息提交:", data);
                        console.log("步骤缓存:", stepCacheRef.current);
                    }
                }, children: (<FormInfo
                    list={[<Input name="candidateName" label="候选人姓名" rule="REQ"/>,
                        <PhoneNumber name="contactPhone" label="联系电话" rule="REQ"/>,
                        <Input name="email" label="电子邮箱" rule="REQ EMAIL"/>,
                        <DatePicker name="dateOfBirth" label="出生日期"/>,]}
                />),
            }, {
                title: "教育经历", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex}) => {
                        console.log("教育经历提交:", data);
                        console.log("步骤缓存:", stepCacheRef.current);
                    }
                }, children: (<FormInfo
                    list={[<Input name="university" label="毕业院校" rule="REQ"/>, <Select
                        name="educationDegree"
                        label="最高学历"
                        rule="REQ"
                        options={[{label: "本科", value: "bachelor"}, {
                            label: "硕士研究生", value: "master"
                        }, {label: "博士研究生", value: "doctor"},]}
                    />, <Select
                        name="major"
                        label="专业领域"
                        rule="REQ"
                        options={[{label: "计算机科学与技术", value: "cs"}, {
                            label: "软件工程", value: "se"
                        }, {label: "信息管理与信息系统", value: "im"},]}
                    />,]}
                />),
            }, {
                title: "工作经历", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex, isLastStep}) => {
                        console.log("工作经历提交:", data);
                        console.log("所有步骤缓存数据:", stepCacheRef.current);
                        // 在最后一步合并所有步骤的数据
                        const allData = {};
                        Object.keys(stepCacheRef.current).forEach(key => {
                            Object.assign(allData, stepCacheRef.current[key].data);
                        });
                        console.log("合并后的完整数据:", allData);
                        alert("人才信息提交成功！" + JSON.stringify(allData, null, 2));
                    }
                }, children: (<FormInfo
                    list={[<Input name="lastCompany" label="上家公司名称"/>, <Select
                        name="position"
                        label="职位级别"
                        options={[{label: "初级工程师", value: "junior"}, {
                            label: "中级工程师", value: "mid"
                        }, {label: "高级工程师", value: "senior"},]}
                    />, <TextArea name="workExperience" label="工作经历描述" block/>,]}
                />),
            },],
        });
    };

    return (<Space>
        <Button type="primary" onClick={handleOpenRecruitment}>
            发起人才招聘
        </Button>
        <Button onClick={() => modalApi.close()}>关闭</Button>
    </Space>);
};

// 演示 stepCacheRef 的使用
const StepCacheExample = () => {
    const modal = useFormStepModal();
    const normalModal = useModal();
    const handleOpen = () => {
        const modalApi = modal({
            title: "stepCacheRef 演示", items: [{
                title: "第一步", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex}) => {
                        console.log("第一步数据:", data);
                        console.log("当前缓存:", stepCacheRef.current);
                    }
                }, children: (<FormInfo
                    list={[<Input name="field1" label="字段1" rule="REQ"/>, <Input name="field2" label="字段2"/>,]}
                />),
            }, {
                title: "第二步", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex}) => {
                        console.log("第二步数据:", data);
                        console.log("当前缓存:", stepCacheRef.current);
                        console.log("第一步缓存数据:", stepCacheRef.current[0]);
                    }
                }, children: (<FormInfo
                    list={[<Input name="field3" label="字段3" rule="REQ"/>, <Input name="field4" label="字段4"/>,]}
                />),
            }, {
                title: "第三步", formProps: {
                    onSubmit: (data, {stepCacheRef, currentIndex, isLastStep}) => {
                        console.log("第三步数据:", data);
                        console.log("所有缓存数据:", stepCacheRef.current);

                        // 合并所有步骤的数据
                        const allData = {};
                        Object.keys(stepCacheRef.current).forEach(key => {
                            Object.assign(allData, stepCacheRef.current[key].data);
                        });
                        console.log("完整数据:", allData);

                        // 显示缓存内容
                        const cacheContent = Object.entries(stepCacheRef.current).map(([index, cache]) => ({
                            step: index, data: cache.data, output: cache.output
                        }));

                        normalModal({
                            children: (<Space direction="vertical" size={16} style={{padding: 24}}>
                                <Card title="提交成功" size="small">
                                    <Space direction="vertical" size={8}>
                                        {cacheContent.map((item, idx) => (<Card key={idx} size="small" type="inner"
                                                                                title={`步骤 ${parseInt(item.step) + 1}`}>
                                            <Space direction="vertical" size={4}>
                                                {Object.entries(item.data).map(([key, value]) => (
                                                    <Tag key={key}>{key}: {String(value)}</Tag>))}
                                            </Space>
                                        </Card>))}
                                    </Space>
                                </Card>
                                <Button onClick={() => modalApi.close()}>关闭</Button>
                            </Space>), footerButtons: []
                        });
                    }
                }, children: (<FormInfo
                    list={[<Input name="field5" label="字段5" rule="REQ"/>, <Input name="field6" label="字段6"/>,]}
                />),
            },],
        });
    };

    return (<Button onClick={handleOpen}>stepCacheRef 演示</Button>);
};

const BaseExample = () => {
    return (<PureGlobal>
        <Space direction="vertical">
            <RecruitmentStepModal/>
            <Divider/>
            <Space>
                <StepCacheExample/>
            </Space>
        </Space>
    </PureGlobal>);
};

render(<BaseExample/>);
