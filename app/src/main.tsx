import React from 'react'
import ReactDOM from 'react-dom'
import {createClient, Provider} from "urql";

import './index.css'
import App from './App'


const client = createClient({
    url: 'https://rickandmortyapi.com/graphql/',
    requestPolicy: 'cache-and-network',
})

ReactDOM.render(
    <React.StrictMode>
        <Provider value={client}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)