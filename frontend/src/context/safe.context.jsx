const { useContext, createContext, useReducer } = require("react");

const SafeStateContext = createContext();
const SafeDispatchContext = createContext();

const initialState = {
  selectedSafe: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_STATE":
            return { ...state, ...action.payload };
        case "RESET":
            return { ...initialState };
        default:
            throw `There is no action called ${action.type}`;
    }
};

export const SafeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <SafeStateContext.Provider value={state}>
        <SafeDispatchContext.Provider value={dispatch}>
            {children}
        </SafeDispatchContext.Provider>
    </SafeStateContext.Provider>

};

export const useSafeState = () => useContext(SafeStateContext);
export const useSafeDispatch = () => useContext(SafeDispatchContext);
