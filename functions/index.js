const express = require('express');
const functions = require('firebase-functions');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const authMiddleware = require("./src/authMiddleware.js");
const resolvers = require('./graphql/resolver.js');
const schema = require('./graphql/schema.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

exports.express = functions.region('southamerica-east1').https.onRequest(app);
