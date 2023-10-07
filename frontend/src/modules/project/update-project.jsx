import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectById } from "../../api/project/project.queries";
import { updateProject } from "../../api/project/project.mutations";
import { useUpdateProjectState, useUpdateProjectDispatch } from "../../context/update-project.context";
import { ProcessList } from "./update-project/process-list";
import { ProjectBoard } from "./update-project/project-board";
import "./update-project/update-project.css";

export function UpdateProject() {

    const params = useParams();
    const [viewType, setViewType] = useState("board");

    const [project, setProject] = useState();

    const [inEditMode, setEditMode] = useState(false);
    const [updateProjectData, setUpdateProjectData] = useState({
        title: null,
        description: null
    });

    const updateProjectState = useUpdateProjectState();
    const updateProjectDispatch = useUpdateProjectDispatch();

    useEffect(() => {
        if (!updateProjectState?.selectedProject && params.id) {
            projectById(params.id).then((projectResponse) => {
                setProject(projectResponse?.data?.projectById);
                setUpdateProjectData({
                    title: projectResponse?.data?.projectById?.title,
                    description: projectResponse?.data?.projectById?.description
                })
                updateProjectDispatch({ type: "SET_SELECTED_PROJECT", payload: projectResponse?.data?.projectById });
            });
        }
    }, [params, updateProjectState]);

    const executeProjectUpdate = () => {
        updateProject(project?._id, updateProjectData).then((updateProjectResponse) => {
            if (updateProjectResponse?.data?.updateProject) {
                setEditMode(false);
                setUpdateProjectData({
                    title: null,
                    description: null
                });
                updateProjectDispatch({ type: "FORGET_SELECTED_PROJECT" });
            }
        });
    };

    return <div className="aae-update-project">

        <div className="aae-update-project__header">

            <div className="aae-update-project__input">
                {!inEditMode && <>
                    <h2 className="aae-update-project__title"> {project?.title}</h2>
                    <h3 className="aae-update-project__description">{project?.description}</h3>
                </>}
                {inEditMode && <>

                    <input
                        style={{
                            display: "block",
                            marginBottom: "4px",
                            fontSize: "22px"
                        }}
                        defaultValue={project?.title}
                        onChange={(event) => {
                            setUpdateProjectData((updateProject) => ({ ...updateProject, title: event.target.value }))
                        }} />

                    <input
                        style={{
                            display: "block",
                            marginBottom: "4px"
                        }}
                        defaultValue={project?.description}
                        onChange={(event) => {
                            setUpdateProjectData((updateProject) => ({ ...updateProject, description: event.target.value }))
                        }} />

                </>}
            </div>

            <div className="aae-update-project__button-container">
                {!inEditMode && <button onClick={() => { setEditMode(true) }}>Edit</button>}
                {inEditMode && <button style={{ marginRight: "4px" }} onClick={() => { executeProjectUpdate() }}>Save</button>}
                {inEditMode && <button onClick={() => { setEditMode(false) }}>Close</button>}
            </div>

            <div className="aae-update-project__view-settings">
                <button style={{ marginRight: "4px" }} disabled={viewType == "board"} onClick={() => { setViewType("board") }}>Board</button>
                <button disabled={viewType == "list"} onClick={() => { setViewType("list") }}>List</button>
            </div>
        </div>

        {viewType == "list" && <div className="aae-update-project__list">
            <ProcessList project={updateProjectState?.selectedProject} />
        </div>}

        {viewType == "board" && <div className="aae-update-project__board">
            <ProjectBoard project={updateProjectState?.selectedProject} />
        </div>}

    </div>
}
