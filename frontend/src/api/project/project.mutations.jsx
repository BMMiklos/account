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

export const createProcess = async (data) => {

    const response = await graphqlFetch({
        operationName: "CreateProcess",
        query: `mutation CreateProcess($data: ProcessCreateInput!) {
            createProcess(data: $data) {
                _id
                title
                description
                project {
                    _id
                }
                entries {
                    _id
                }
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

export const deleteProcess = async (id) => {

    const response = await graphqlFetch({
        operationName: "DeleteProcess",
        query: `mutation DeleteProcess($id: ID!) {
            deleteProcess(id: $id)
        }`,
        variables: {
            id
        }
    });

    return await response.json();

};

export const updateProcess = async (id, data) => {

    const response = await graphqlFetch({
        operationName: "UpdateProcess",
        query: `mutation UpdateProcess($id: ID! $data: ProcessUpdateInput!) {
            updateProcess(id: $id data: $data) {
                _id
                title
                description
                project {
                    _id
                }
                entries {
                    _id
                    title
                    description
                }
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
