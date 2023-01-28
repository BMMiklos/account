import { graphqlFetch } from "../graphql-fetch";

export const moveEntry = async ({ project, process, entry, index }) => {

    const response = await graphqlFetch({
        operationName: "MoveEntry",
        query: `mutation MoveEntry($project: ID!, $process: ID, $entry: ID!, $index: Int!) {
            moveEntry(project: $project, process: $process, entry: $entry, index: $index)
            }`,
        variables: {
            project,
            process,
            entry,
            index
        }
    });

    return await response.json();

};