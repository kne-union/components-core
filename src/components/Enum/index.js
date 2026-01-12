import {preset} from "@kne/react-enum";
import transform from "lodash/transform";

const baseLoaders = [['commonStatus', () => [{value: 'open', description: '开启', type: 'success',}, {
    value: 'close', description: '关闭', type: 'danger'
}]], ["gender", () => [{value: "M", description: "男"}, {
    value: "F", description: "女",
},],], ["marital", () => [{description: "已婚", value: "Y"}, {
    description: "未婚", value: "N",
},],], ["confirm", () => [{description: "是", value: "Y"}, {
    description: "否", value: "N",
},],], ["political", () => [{description: "中共党员", value: "中共党员"}, {
    description: "共青团员", value: "共青团员",
}, {description: "群众", value: "群众"}, {
    description: "其他党派", value: "其他党派",
},],], ["phoneStateEnum", () => [{
    value: 0, description: "空号",
}, {
    value: 1, description: "实号",
}, {
    value: 2, description: "停机",
}, {
    value: 3, description: "库无",
}, {
    value: 4, description: "沉默号",
}, {
    value: 5, description: "风险号",
},],], ["degreeEnum", () => [{
    description: "初中", value: 10,
}, {
    description: "中专", value: 20,
}, {
    description: "高中", value: 30,
}, {
    description: "大专", value: 40,
}, {
    description: "本科", value: 50,
}, {
    description: "硕士研究生", value: 60,
}, {
    description: "博士研究生", value: 70,
}, {
    description: "博士后", value: 75,
}, {
    description: "学历不限", value: 999,
},],],];

preset({
    base: transform(baseLoaders, (result, value) => {
        result[value[0]] = value[1];
    }, {}),
});

export {default} from "@kne/react-enum";
