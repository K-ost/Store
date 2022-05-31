import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.scss'
import App from './App'
import { url } from './helpers'


// GraphQL init
const client = new ApolloClient({
  uri: `${url}/graphql`,
  cache: new InMemoryCache()
})


const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>
)
