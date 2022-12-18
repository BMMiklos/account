const { useContext, createContext, useReducer } = require("react");

const OverlayStateContext = createContext();
const OverlayDispatchContext = createContext();

const initialState = {
    // element to render in modal
    element: null,

    // styles for the overlay components
    overlayStyle: null,
    innerStyle: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ELEMENT_TO_RENDER":
            return { ...state, ...action.payload };
        case "RESET":
            return { ...initialState };
        default:
            throw `There is no action called ${action.type}`;
    }
};

export const OverlayProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <OverlayStateContext.Provider value={state}>
        <OverlayDispatchContext.Provider value={dispatch}>
            {children}
        </OverlayDispatchContext.Provider>
    </OverlayStateContext.Provider>

};

export const useOverlayState = () => useContext(OverlayStateContext);
export const useOverlayDispatch = () => useContext(OverlayDispatchContext);
