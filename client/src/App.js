import './App.css';
import Launches from './components/Launches';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import sx from './sx.png'

const client = new ApolloClient({
uri: 'http://localhost:5000/graphql'
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
