const graphql = require('graphql')
const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql


//LaunchType

const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLString},
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean},
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

const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        body: {type: GraphQLString},
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
            args: {flight_number:{type: GraphQLInt}},
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res => res.data)
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets')
                .then(res => res.data)
            }
        },
        rocket: {
            type: RocketType,
            args: {rocket_id:{type: GraphQLString}},
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.rocket_id}`)
                .then(res => res.data)
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(res => res.data)
            }
        },
        post: {
            type: PostType,
            args: {id:{type: GraphQLString}},
            resolve(parent, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
                .then(res => res.data)
            }
        },
    }
})

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addPost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                title: {type: GraphQLString},
                body: {type: GraphQLString}
            },
            resolve(parent, args) {
                return axios.post('https://jsonplaceholder.typicode.com/posts',{
                    id: args.id,
                    title: args.title,
                    body: args.body
                })
                .then(res => res.data)
            }
        },
        editPost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                title: {type: GraphQLString},
                body: {type: GraphQLString}
            },
            resolve(parent, args) {
                return axios.patch(`https://jsonplaceholder.typicode.com/posts/${args.id}`,args)
                .then(res => res.data)
            }
        },
        deletePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                return axios.delete(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
                .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation
})
