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
        case "SET_SELECTED_PROJECT":
            return { ...state, project: action.payload };
            break;
        case "DELETE_SELECTED_PROJECT":
            return { ...state, project: null };
            break;
        case "SET_SELECTED_PROCESS":
            return { ...state, process: action.payload };
            break;
        case "DELETE_SELECTED_PROCESS":
            return { ...state, process: null };
            break;
        case "SET_SELECTED_ENTRY":
            return { ...state, entry: action.payload };
            break;
        case "DELETE_SELECTED_ENTRY":
            return { ...state, entry: null };
            break;
        default:
            throw `There is no action called ${action.type}`;
    }
}

export const UpdateProjectProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer);
    return <ProjectStateContext.Provider value={state}>
        <ProjectDispatchContext.Provider value={dispatch}>
            {children}
        </ProjectDispatchContext.Provider>
    </ProjectStateContext.Provider>
}

export const useUpdateProjectState = () => useContext(ProjectStateContext);
export const useUpdateProjectDispatch = () => useContext(ProjectDispatchContext);
