import './App.css'
import Pokemon from './components/Pokemon'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { store } from './app/store'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="App">
          <Pokemon />
        </div>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
