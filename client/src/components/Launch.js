import React from 'react'
import gql from 'graphql-tag'
import {
    useQuery,
  } from "@apollo/client";
  import { Link } from 'react-router-dom'
  import classNames from 'classnames';

const LAUNCH_QUERY = gql`
query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
        flight_number
        mission_name
        launch_year
        launch_success
        launch_date_local
        rocket {
            rocket_id
            rocket_name
            rocket_type
        }
    }
}`

const Launch = ({match:{params} = {} } = {}) => {

       let {flight_number} = params || {}
       flight_number = parseInt(flight_number)
    const { loading, error, data } = useQuery(LAUNCH_QUERY,  {
        variables: { flight_number },
      });

    const  {launch = {}} = data || {}

    const {
        flight_number: Flight_number,
        launch_year,
        launch_success,
        mission_name,
        rocket: {
            rocket_id,
            rocket_name,
            rocket_type
        } = {}} = launch
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        return <>
                <h1 className="display-4 my-3">
                    <span className="text-dark">Mission:</span> {mission_name}
                    </h1>
               <h4 className="mb-3">
                    Launch Details
               </h4>
               <ul className="list-group">
                   <li className="list-group-item">
                       Flight Number: {Flight_number}
                   </li>
                   <li className="list-group-item">
                       Launch Year: {launch_year}
                   </li>
                   <li className="list-group-item">
                       Launch Successful: <span className={classNames({
                           'text-success': launch_success,
                           'text-danger': !launch_success
                       })}>
                       {
                           launch_success ? 'Yes' : 'No'
                           }
                       </span>
                   </li>
               </ul>

               <h4 className="my-3">
                    Rocket Details
               </h4>
               <ul className="list-group">
                   <li className="list-group-item">Rocket ID: {rocket_id}</li>
                   <li className="list-group-item">Rocket Name: {rocket_name}</li>
                   <li className="list-group-item">Rocket Type: {rocket_type}</li>
               </ul>
               <hr/>
               <Link to="/" className="btn btn-secondary">Back</Link>
               </>
  }

export default Launch
