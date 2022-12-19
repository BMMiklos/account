import { graphqlFetch } from "../graphql-fetch";

export const createProject = async (data) => {

    const response = await graphqlFetch({
        operationName: "CreateProject",
        query: `mutation CreateProject($data: ProjectCreateInput!) {
            createProject(data: $data) {
                _id
                title
                processes {
                    _id
                }
                entries {
                    _id
                }
                description
                createdAt
                updatedAt
            }
        }`,
        variables: {
            data
        }
    });

    return await response.json();

};

export const createEntry = async (data) => {

    const response = await graphqlFetch({
        operationName: "CreateEntry",
        query: `mutation CreateEntry($data: EntryCreateInput!) {
            createEntry(data: $data) {
                _id
                project {
                    _id
                }
                title
                description
                }
            }`,
        variables: {
            data
        }
    });

    return await response.json();

};

export const updateProject = async (id, data) => {

    const response = await graphqlFetch({
        operationName: "UpdateProject",
        query: `mutation UpdateProject($id: ID!, $data: ProjectUpdateInput!) {
            updateProject(id: $id, data: $data) {
                _id
                title
                processes {
                    _id
                    title
                    description
                }
                entries {
                    _id
                    title
                    description
                }
                description
                createdAt
                updatedAt
                }
            }`,
        variables: {
            id,
            data
        }
    });

    return await response.json();

};

export const deleteProject = async (id) => {

    const response = await graphqlFetch({
        operationName: "DeleteProject",
        query: `mutation DeleteProject($id: ID!) {
            deleteProject(id: $id)
            }`,
        variables: {
            id
        }
    });

    return await response.json();

};
