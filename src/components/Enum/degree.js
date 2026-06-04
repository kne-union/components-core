import { createFormatMessage } from './withLocale';

const degree = ({ locale }) => {
    const formatMessage = createFormatMessage(locale);
    return [{
        description: formatMessage({ id: 'DegreeJuniorHigh' }), value: 10,
    }, {
        description: formatMessage({ id: 'DegreeSecondaryVocational' }), value: 20,
    }, {
        description: formatMessage({ id: 'DegreeSeniorHigh' }), value: 30,
    }, {
        description: formatMessage({ id: 'DegreeJuniorCollege' }), value: 40,
    }, {
        description: formatMessage({ id: 'DegreeBachelor' }), value: 50,
    }, {
        description: formatMessage({ id: 'DegreeMaster' }), value: 60,
    }, {
        description: formatMessage({ id: 'DegreeDoctor' }), value: 70,
    }, {
        description: formatMessage({ id: 'DegreePostDoc' }), value: 75,
    }, {
        description: formatMessage({ id: 'DegreeUnlimited' }), value: 999,
    }];
};

export default degree;
