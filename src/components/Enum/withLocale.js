import {createWithIntlProvider, createIntl} from '@kne/react-intl';
import zhCN from './locale/zh-CN';
import enUS from './locale/en-US';

const withLocale = createWithIntlProvider({
    defaultLocale: 'zh-CN', messages: {
        'zh-CN': zhCN, 'en-US': enUS
    }, namespace: 'components-core'
});

export const createFormatMessage = locale => {
    const {formatMessage} = createIntl({
        locale,
        messages: {
            'zh-CN': zhCN, 'en-US': enUS
        },
        namespace: 'components-core'
    });
    return formatMessage;
};

export default withLocale;
