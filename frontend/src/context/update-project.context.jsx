const { useContext, createContext, useReducer } = require("react");

const ProjectStateContext = createContext();
const ProjectDispatchContext = createContext();

const initialState = {
    selectedProject: null,
    selectedProcess: null, // not used
    selectedEntry: null, // not used

    processesToRender: null,

    entryDragAndDropSettings: {
        process: null,
        entry: null,
        index: null
    },

    processDragAndDropSettings: {
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
        case "SET_SELECTED_PROCESS":
            return { ...state, selectedProcess: action.payload };
            break;
        case "FORGET_SELECTED_PROCESS":
            return { ...state, selectedProcess: null };
            break;
        case "SET_SELECTED_ENTRY":
            return { ...state, selectedEntry: action.payload };
            break;
        case "FORGET_SELECTED_ENTRY":
            return { ...state, selectedEntry: null };
            break;

        case "SET_PROCESSES_TO_RENDER":
            return { ...state, processesToRender: action.payload };
            break;
        case "FORGET_PROCESSES_TO_RENDER":
            return { ...state, processesToRender: null };
            break;

        case "SET_ENTRY_MOVE_SETTINGS":
            return {
                ...state, entryDragAndDropSettings: {
                    ...state.entryDragAndDropSettings,
                    ...action.payload,
                }
            };
        case "FORGET_ENTRY_MOVE_SETTINGS":
            return { ...state, entryDragAndDropSettings: initialState.entryDragAndDropSettings };
        case "CLEAR_ALL":
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
