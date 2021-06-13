import React, { Component } from 'react'
import gql from 'graphql-tag'
//import {Query} from 'react-apollo'// uncomment when needed preivious version of Query
import LaunchItem from './LaunchItem'
import {
    useQuery,
  } from "@apollo/client";


 const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
}
 `

const Launches = () => {
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        return <>
                {data.launches.map((launch, i) => (
                                    <LaunchItem key={i} launch = {launch}/>
                                ))}
               </>
  }

// uncomment when using previous version

// export class Launches extends Component {
    
//     render() {
//         return (
//             <>
//                 <h1 className="display-4 my-3">Launches</h1>
//                 <Query query={LAUNCHES_QUERY}>
//                     {
//                         ({ loading, error, data }) => {
//                             if(loading) return <h3>Loading...</h3>
//                             if(error) console.log(error)
//                             return <>
//                             {
//                                 data.launches.map((launch, i) => (
//                                     <LaunchItem key={i} launch = {launch}/>
//                                 ))
//                             }
//                             </>
//                         }
//                     }

//                 </Query>
//             </>
//         )
//     }
// }

export default Launches
