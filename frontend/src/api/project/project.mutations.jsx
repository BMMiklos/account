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
