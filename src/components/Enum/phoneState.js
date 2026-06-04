import { createFormatMessage } from './withLocale';

const phoneState = ({ locale }) => {
    const formatMessage = createFormatMessage(locale);
    return [{
        value: 0, description: formatMessage({ id: 'PhoneStateEmpty' }),
    }, {
        value: 1, description: formatMessage({ id: 'PhoneStateValid' }),
    }, {
        value: 2, description: formatMessage({ id: 'PhoneStateSuspended' }),
    }, {
        value: 3, description: formatMessage({ id: 'PhoneStateNotFound' }),
    }, {
        value: 4, description: formatMessage({ id: 'PhoneStateSilent' }),
    }, {
        value: 5, description: formatMessage({ id: 'PhoneStateRisk' }),
    }];
};

export default phoneState;
