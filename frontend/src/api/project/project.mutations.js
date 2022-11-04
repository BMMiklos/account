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
