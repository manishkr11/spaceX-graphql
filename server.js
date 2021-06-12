const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema')

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

const PORT = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`server running at port ${PORT}`)
});