import './App.css';
import Launches from './components/Launches';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import sx from './sx.png'

const client = new ApolloClient({
uri: 'http://localhost:5000/graphql',
cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client} >
      <div className="container">
        <img 
          src={sx} 
          alt="spaceX"
          style={{width:300,
          display: 'block', 
          margin: 'auto'}}/>
        <Launches />
      </div>
    </ApolloProvider>
  );
}

export default App;
