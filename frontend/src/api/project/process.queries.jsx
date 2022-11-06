import { graphqlFetch } from "../graphql-fetch";

export const processesByProject = async (project) => {

    const response = await graphqlFetch({
        operationName: "ProcessesByProject",
        query: `query ProcessesByProject($project: ID!) {
            processesByProject(project: $project) {
                _id
                title
                description
                createdAt
                updatedAt
                project {
                    _id
                    title
                    description
                    createdAt
                    updatedAt
                }
                entries {
                    _id
                    title
                    description
                }
            }
        }`,
        variables: {
            project
        }
    });

    return await response.json();

};
