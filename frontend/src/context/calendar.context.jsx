const { useContext, createContext, useReducer } = require("react");

const CalendarStateContext = createContext();
const CalendarDispatchContext = createContext();

const initialState = {
  selectedDate: "",
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

export const CalendarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <CalendarStateContext.Provider value={state}>
        <CalendarDispatchContext.Provider value={dispatch}>
            {children}
        </CalendarDispatchContext.Provider>
    </CalendarStateContext.Provider>

};

export const useCalendarState = () => useContext(CalendarStateContext);
export const useCalendarDispatch = () => useContext(CalendarDispatchContext);
