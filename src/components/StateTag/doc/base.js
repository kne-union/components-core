const { default: StateTag } = _StateTag;
const { default: Descriptions } = _Descriptions;
const { range } = lodash;

const BaseExample = () => {
  return (
    <div>
      <div>使用场景: 列表页Table,简历详情页</div>
      <br />
      <Descriptions
        dataSource={[
          [
            { label: "使用规则", content: "待XX，暂停" },
            { label: "代码示例", content: `{type: "info", text: "标签内容"}` },
          ],
          [
            {
              label: "标签样式",
              content: <StateTag {...{ type: "info", text: "标签内容" }} />,
            },
            {
              label: "示例",
              content: <StateTag {...{ type: "info", text: "待提交开票" }} />,
            },
          ],
          [
            { label: "使用规则", content: "XX中，正在XX中" },
            {
              label: "代码示例",
              content: `{type: "progress", text: "退票审核中"}`,
            },
          ],
          [
            {
              label: "标签样式",
              content: <StateTag {...{ type: "progress", text: "标签内容" }} />,
            },
            {
              label: "示例",
              content: (
                <StateTag {...{ type: "progress", text: "退票审核中" }} />
              ),
            },
          ],
          [
            { label: "使用规则", content: "通过，成功，完成" },
            {
              label: "代码示例",
              content: `{type: "success", text: "标签内容"}`,
            },
          ],
          [
            {
              label: "标签样式",
              content: <StateTag {...{ type: "success", text: "标签内容" }} />,
            },
            {
              label: "示例",
              content: <StateTag {...{ type: "success", text: "标签内容" }} />,
            },
          ],
          [
            { label: "使用规则", content: "不通过，失败，淘汰，缺席，拒绝" },
            {
              label: "代码示例",
              content: `{type: "danger", text: "退票拒绝"}`,
            },
          ],
          [
            {
              label: "标签样式",
              content: <StateTag {...{ type: "danger", text: "标签内容" }} />,
            },
            {
              label: "示例",
              content: <StateTag {...{ type: "danger", text: "退票拒绝" }} />,
            },
          ],
          [
            { label: "使用规则", content: "取消，撤销，停止" },
            { label: "代码示例", content: `{text: "撤销开票审核"}` },
          ],
          [
            {
              label: "标签样式",
              content: <StateTag {...{ text: "标签内容" }} />,
            },
            {
              label: "示例",
              content: <StateTag {...{ text: "撤销开票审核" }} />,
            },
          ],
          [
            { label: "使用规则", content: "（暂时还未用到）" },
            { label: "代码示例", content: `{type: "other", text: "标签内容"}` },
          ],
          [
            {
              label: "标签样式",
              content: <StateTag {...{ type: "other", text: "标签内容" }} />,
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
