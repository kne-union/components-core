import { createFormatMessage } from './withLocale';

const confirm = ({ locale }) => {
    const formatMessage = createFormatMessage(locale);
    return [{
        description: formatMessage({ id: 'ConfirmYes' }), value: "Y",
    }, {
        description: formatMessage({ id: 'ConfirmNo' }), value: "N",
    }];
};

export default confirm;
