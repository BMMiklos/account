const { useContext, createContext, useReducer } = require("react");

const ProjectStateContext = createContext();
const ProjectDispatchContext = createContext();

const initialState = {
    selectedProject: null,
    selectedProcesses: null,
    selectedEntry: null,

    entryMoveSettings: {
        project: null,
        process: null,
        entry: null,
        index: null
    },

    processMoveSettings: {
        project: null,
        process: null,
        index: null
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SELECTED_PROJECT":
            return { ...state, selectedProject: action.payload };
            break;
        case "FORGET_SELECTED_PROJECT":
            return { ...state, selectedProject: null };
            break;
        case "SET_SELECTED_PROCESSES":
            return { ...state, selectedProcesses: action.payload };
            break;
        case "FORGET_SELECTED_PROCESSES":
            return { ...state, selectedProcesses: null };
            break;
        case "SET_SELECTED_ENTRY":
            return { ...state, selectedEntry: action.payload };
            break;
        case "FORGET_SELECTED_ENTRY":
            return { ...state, selectedEntry: null };
            break;
        case "SET_ENTRY_MOVE_SETTINGS":
            return {
                ...state, entryMoveSettings: {
                    ...state.entryMoveSettings,
                    ...action.payload,
                }
            };
        case "FORGET_ENTRY_MOVE_SETTINGS":
            return { ...state, entryMoveSettings: initialState.entryMoveSettings };
        case "RESET":
            return { ...initialState }
        default:
            throw `There is no action called ${action.type}`;
    }
}

export const UpdateProjectProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <ProjectStateContext.Provider value={state}>
        <ProjectDispatchContext.Provider value={dispatch}>
            {children}
        </ProjectDispatchContext.Provider>
    </ProjectStateContext.Provider>
}

export const useUpdateProjectState = () => useContext(ProjectStateContext);
export const useUpdateProjectDispatch = () => useContext(ProjectDispatchContext);
