import React from 'react'
import ReactDOM from 'react-dom'
import {createClient, Provider} from "urql";

import './index.css'
import App from './App'


const client = createClient({
    url: 'http://192.168.1.255:8080/graphql',
    //url: 'https://rickandmortyapi.com/graphql/',
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
