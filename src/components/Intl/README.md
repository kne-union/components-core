
# Intl


### 概述

支持系统国际化

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Intl(@components/Intl),global(@components/Global),antd(antd),localeEN(@components/Intl/doc/locale/en-US),localeCN(@components/Intl/doc/locale/zh-CN)

```jsx
const {FormattedMessage, IntlProvider} = _Intl;
const {PureGlobal} = global;
const {Select, Space} = antd;
const {default: en} = localeEN;
const {default: cn} = localeCN;
const {useState} = React;
const BaseExample = () => {
    const [locale, setLocale] = useState('zh-CN');
    return (<Space>
        <Select value={locale} onChange={setLocale}
                options={['zh-CN', 'en-US'].map(key => ({value: key, label: key}))}/>
        <PureGlobal
            preset={{
                locale
            }}
        >
            <IntlProvider locale={locale} importMessages={locale => {
                return {
                    default: {
                        'zh-CN': cn, 'en-US': en
                    }[locale]
                };
            }}>
                <FormattedMessage defaultMessage="按钮" id="ButtonText">
                    {text => <div>{text}</div>}
                </FormattedMessage>
            </IntlProvider>

        </PureGlobal>
    </Space>);
};

render(<BaseExample/>);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

