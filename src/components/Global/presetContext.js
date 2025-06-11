import React, {createContext, useContext, useRef} from 'react';

export const context = createContext({});

const {Provider: ReactProvider} = context;

const Provider = ({value = {}, children}) => {
    const preset = useRef(value);
    preset.current = value;
    return <ReactProvider value={preset}>
        {children}
    </ReactProvider>
};

const usePreset = () => {
    const preset = useContext(context);
    return preset.current || {};
};

export {Provider, usePreset};
