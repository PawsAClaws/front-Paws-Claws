import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'leaflet/dist/leaflet.css';

const queryClient = new QueryClient({

});

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <QueryClientProvider client={queryClient}>

      <App />

    </QueryClientProvider>
  </Provider>
)