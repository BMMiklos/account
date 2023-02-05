export const createSafe = async ({ data }) => {

    const response = await graphqlFetch({
        operationName: "CreateSafe",
        query: `mutation CreateSafe($data: SafeCreateInput!) {
            createSafe(data: $data) {
                _id
                label
                secret
                description
            }
        }`,
        variables: {
            data
        }
    });

    return await response.json();

};

export const updateSafe = async ({ id, password, data }) => {

    const response = await graphqlFetch({
        operationName: "UpdateSafe",
        query: `mutation UpdateSafe($id: !ID, $password: String, $data: SafeCreateInput!) {
            updateSafe(id: $id, password: $password, data: $data) {
                _id
                label
                secret
                description
            }
        }`,
        variables: {
            id,
            password,
            data
        }
    });

    return await response.json();

};

export const deleteSafe = async ({ id, password }) => {

    const response = await graphqlFetch({
        operationName: "DeleteSafe",
        query: `mutation DeleteSafe($id: !ID, $password: String) {
            deleteSafe(id: $id, password: $password)
        }`,
        variables: {
            id,
            password
        }
    });

    return await response.json();

};
