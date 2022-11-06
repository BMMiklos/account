import { graphqlFetch } from "../graphql-fetch";

export const projectsBySearch = async (searchQuery = "") => {

    const response = await graphqlFetch({
        operationName: "ProjectsBySearch",
        query: `query ProjectsBySearch($searchQuery: String!) {
            projectsBySearch(searchQuery: $searchQuery) {
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
            searchQuery: searchQuery
        }
    });

    return await response.json();

};

export const projectById = async (id) => {

    const response = await graphqlFetch({
        operationName: "ProjectById",
        query: `query ProjectById($id: ID!) {
            projectById(id: $id) {
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
            id
        }
    });

    return await response.json();

};
