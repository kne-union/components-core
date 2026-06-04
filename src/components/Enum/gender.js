import { createFormatMessage } from './withLocale';

const gender = ({ locale }) => {
    const formatMessage = createFormatMessage(locale);
    return [{
        value: "M", description: formatMessage({ id: 'GenderMale' }),
    }, {
        value: "F", description: formatMessage({ id: 'GenderFemale' }),
    }];
};

export default gender;
