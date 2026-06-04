import { createFormatMessage } from './withLocale';

const political = ({ locale }) => {
    const formatMessage = createFormatMessage(locale);
    return [{
        description: formatMessage({ id: 'PoliticalPartyMember' }), value: "中共党员",
    }, {
        description: formatMessage({ id: 'PoliticalLeagueMember' }), value: "共青团员",
    }, {
        description: formatMessage({ id: 'PoliticalMasses' }), value: "群众",
    }, {
        description: formatMessage({ id: 'PoliticalOther' }), value: "其他党派",
    }];
};

export default political;
