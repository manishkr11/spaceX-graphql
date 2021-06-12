const graphql = require('graphql')
const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql


//LaunchType

const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLString},
        rocket: {type: RocketType}
    })
})

//RocketType

const RocketType = new GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString},
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res => res.data)
            }
        },
        launch: {
            type: LaunchType,
            args: {flight_number:{type: GraphQLString}},
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})
