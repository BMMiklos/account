import { graphqlFetch } from "../graphql-fetch";

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

export const moveProcess = async ({ project, process, index }) => {

    const response = await graphqlFetch({
        operationName: "MoveProcess",
        query: `mutation MoveProcess($project: ID!, $process: ID!, $index: Int!) {
            moveProcess(project: $project, process: $process, index: $index)
            }`,
        variables: {
            project,
            process,
            index
        }
    });

    return await response.json();

};
