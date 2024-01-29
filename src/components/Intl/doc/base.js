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
