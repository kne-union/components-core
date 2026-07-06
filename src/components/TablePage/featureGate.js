import {useFeatureCall} from '@components/Features';
import get from 'lodash/get';
import {Result} from 'antd';
import {forwardRef} from 'react';


export const withFeatureTablePage = TablePageInner => {
    const FeatureGate = forwardRef(({
                                        featureId, featureRejectedMode = 'result', featureRejectedText, ...props
                                    }, ref) => {
        const {isPass, feature} = useFeatureCall(featureId);
        const hiddenColumns = get(isPass ? feature?.options : feature?.rejectedOptions, 'hiddenColumns');

        if (isPass === false) {
            if (featureRejectedMode === 'hidden') {
                return null;
            }
            return <Result status="403" subTitle={featureRejectedText}/>;
        }

        return (<TablePageInner
            ref={ref}
            key={(hiddenColumns || []).join(',')}
            hiddenColumns={hiddenColumns}
            {...props}
        />);
    });

    return forwardRef(({featureId, featureRejectedMode, featureRejectedText, ...props}, ref) => {
        if (!featureId) {
            return <TablePageInner ref={ref} {...props} />;
        }

        return (<FeatureGate
            ref={ref}
            featureId={featureId}
            featureRejectedMode={featureRejectedMode}
            featureRejectedText={featureRejectedText}
            {...props}
        />);
    });
};
