const { default: StateTag } = _StateTag;
const { default: Descriptions } = _Descriptions;
const { range } = lodash;
const { Space, Typography } = antd;

const BaseExample = () => {
  return (
    <div>
      <div>使用场景: 列表页Table,简历详情页</div>
      <br />
      <Descriptions
        dataSource={[
          [
            { label: "使用规则", content: "待XX，暂停" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "info", text: "待提交开票" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="info" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "XX中，正在XX中" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "progress", text: "退票审核中" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="progress" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "通过，成功，完成" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "success", text: "标签内容" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="success" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "不通过，失败，淘汰，缺席，拒绝" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "danger", text: "退票拒绝" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="danger" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "取消，撤销，停止" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "default", text: "撤销开票审核" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="default" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
          [
            { label: "使用规则", content: "（暂时还未用到）" },
            {
              label: "示例",
              content: (
                <Space>
                  <StateTag {...{ type: "other", text: "标签内容" }} />
                  <Typography.Text
                    copyable={{
                      text: '<StateTag type="other" text="标签内容" />',
                    }}
                  />
                </Space>
              ),
            },
          ],
        ]}
      />
      <br />
      <br />
      <div>个别特殊场景（需要单独询问UI):</div>
      <br />
      <Descriptions
        dataSource={[
          [
            { label: "使用规则", content: "待XX，暂停" },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "已推荐简历" }} />
                  <StateTag {...{ type: "success", text: "已退票" }} />
                </div>
              ),
            },
          ],
          [
            { label: "使用规则", content: "已XX待XX" },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "已开票待寄出" }} />
                  <StateTag {...{ type: "success", text: "已待寄待收款" }} />
                </div>
              ),
            },
          ],
          [
            {
              label: "使用规则",
              content: "已XX+词语：根据后面的词语语义进行判断",
            },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "已成功" }} />
                  <StateTag {...{ type: "default", text: "已取消" }} />
                  <StateTag {...{ type: "danger", text: "已失败" }} />
                  <StateTag {...{ type: "progress", text: "已暂停" }} />
                </div>
              ),
            },
          ],
          [
            { label: "使用规则", content: "完全根据语义语境判断" },
            {
              label: "示例",
              content: (
                <div>
                  <StateTag {...{ type: "success", text: "全部到款" }} />
                  <StateTag {...{ type: "success", text: "部分到款" }} />
                  <StateTag {...{ type: "success", text: "简历亮点" }} />
                  <StateTag {...{ type: "danger", text: "简历风险点" }} />
                </div>
              ),
            },
          ],
        ]}
      />
    </div>
  );
};

render(<BaseExample />);
