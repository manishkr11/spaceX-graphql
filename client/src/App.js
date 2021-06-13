import './App.css';
import Launches from './components/Launches';
import Launch from './components/Launch';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import sx from './sx.png'

import {BrowserRouter as Router, Route} from 'react-router-dom'

const client = new ApolloClient({
uri: '/graphql',
cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client} >
      <Router>
      <div className="container">
        <img 
          src={sx} 
          alt="spaceX"
          style={{width:220,
          display: 'block', 
          margin: 'auto'}}/>
        <Route exact path="/" component={Launches}/>
        <Route exact path="/launch/:flight_number" component={Launch} />
      </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
