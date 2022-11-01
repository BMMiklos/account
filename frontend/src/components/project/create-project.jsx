export function CreateProject() {
    return <div>

    <form>

        <label htmlFor="project-name">Project Name</label>
        <input type="text" name="project-name" id="project-name"></input>

        <label htmlFor="project-description">Project Description</label>
        <textarea></textarea>
        
        <input type="button" value="Create"/>

    </form>

    </div>
}