import { createFormatMessage } from './withLocale';

const commonStatus = ({ locale }) => {
    const formatMessage = createFormatMessage(locale);
    return [{
        value: 'open', description: formatMessage({ id: 'CommonStatusOpen' }), type: 'success',
    }, {
        value: 'close', description: formatMessage({ id: 'CommonStatusClose' }), type: 'danger'
    }];
};

export default commonStatus;
