const { useContext, createContext, useReducer } = require("react");

const ProjectStateContext = createContext();
const ProjectDispatchContext = createContext();

const initialState = {
    project: null,
    process: null,
    entry: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PROJECT":
            return { ...state };
            break;
        case "SET_PROCESS":
            return { ...state };
            break;
        case "SET_ENTRY":
            return { ...state };
            break;
        case "SET_ENTRY":
            return { ...state };
            break;
        default:
            throw `There is no action called ${action.type}`;
    }
}

export const ProjectProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer);
    return <ProjectStateContext.Provider value={state}>
        <ProjectDispatchContext.Provider value={dispatch}>
            {children}
        </ProjectDispatchContext.Provider>
    </ProjectStateContext.Provider>
}

export const useProjectState = () => useContext(ProjectStateContext);
export const useProjectDispatch = () => useContext(ProjectDispatchContext);
