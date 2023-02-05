import { graphqlFetch } from "../graphql-fetch";

export const safes = async ({ safeFilter }) => {
  
    const response = await graphqlFetch({
        operationName: "Safes",
        query: `query Safes($safeFilter: SafeFilterInput!) {
            safes(safeFilter: $safeFilter) {
                _id
                label
                secret
                description
            }
        }`,
        variables: {
            safeFilter
        }
    });

    return await response.json();

};

export const safeById = async ({ id, password }) => {

    const response = await graphqlFetch({
        operationName: "SafeById",
        query: `query SafeById($id: ID!, $password: String) {
            safeById(id: $id, password: $password) {
                _id
                label
                secret
                description
            }
        }`,
        variables: {
            id,
            password
        }
    });

    return await response.json();

};
