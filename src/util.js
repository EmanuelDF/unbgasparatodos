import AsyncStorage from '@react-native-async-storage/async-storage';

const uri = "https://southamerica-east1-unb-gasparatodos.cloudfunctions.net/express";
const url = uri + "/graphql";

export async function GraphQLQuery(query, authorization) {

    const graphqlQuery = query;
    const graphqlBody = JSON.stringify({ query: `{${graphqlQuery}}` });
    const opts = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: graphqlBody
    };

    if (authorization) {
        opts.headers = {
            'Authorization': 'Bearer ' + authorization,
            'Content-Type': 'application/json'
        }
    }

    let request = await fetch(url, opts);
    let json = await request.json();

    return json;
}

export async function GraphQLMutation(mutation, authorization) {
    
    const graphqlMutation = mutation;
    const graphqlBody = JSON.stringify({ query: `mutation {${graphqlMutation}}` })
    const opts = {
        mode: "cors",
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + authorization,
            'Content-Type': 'application/json',
        },
        body: graphqlBody,
    };

    let request = await fetch(url, opts);
    let json = await request.json();
    
    return json;
}

export async function StoreData(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error(error);
    }
};

export async function RetrieveData(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value
        }
    } catch (error) {
        console.error(error);
    }
};
