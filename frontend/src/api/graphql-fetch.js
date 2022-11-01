export async function graphqlFetch(graphqlquery) {
    
    let response = await fetch(process.env.REACT_APP_GRAPHQL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(graphqlquery)
    });

    return response;

}
