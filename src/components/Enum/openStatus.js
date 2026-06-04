import { createFormatMessage } from './withLocale';

const openStatus = ({ locale }) => {
    const formatMessage = createFormatMessage(locale);
    return [{
        value: 'open', description: formatMessage({ id: 'OpenStatusOpen' }), type: 'success',
    }, {
        value: 'closed', description: formatMessage({ id: 'OpenStatusClosed' }), type: 'danger'
    }];
};

export default openStatus;
