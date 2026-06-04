import { createFormatMessage } from './withLocale';

const marital = ({ locale }) => {
    const formatMessage = createFormatMessage(locale);
    return [{
        description: formatMessage({ id: 'MaritalMarried' }), value: "Y",
    }, {
        description: formatMessage({ id: 'MaritalSingle' }), value: "N",
    }];
};

export default marital;
