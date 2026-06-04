import {preset} from "@kne/react-enum";

import degree from './degree';
import phoneState from './phoneState';
import openStatus from './openStatus';
import commonStatus from './commonStatus';
import gender from './gender';
import marital from './marital';
import confirm from './confirm';
import political from './political';

preset({
    base: {
        openStatus,
        commonStatus,
        gender,
        marital,
        confirm,
        political,
        phoneStateEnum: phoneState,
        phoneState,
        degreeEnum: degree,
        degree
    },
});

export {default} from "@kne/react-enum";
