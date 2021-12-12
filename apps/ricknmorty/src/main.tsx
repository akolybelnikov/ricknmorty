import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import {createClient, Provider} from "urql";

import App from './app/app';

const client = createClient({
  url: 'https://rickandmortyapi.com/graphql/',
  requestPolicy: 'cache-and-network',
})

ReactDOM.render(
  <StrictMode>
      <Provider value={client}>
          <App/>
      </Provider>
  </StrictMode>,
  document.getElementById('root')
)
