import {useState} from 'react'
import logo from './logo.svg'
import './App.css'
import GenericList from "./components/GenericList";
import Item from "./components/Item"
import {Main} from "./views/Main";

let data = [{id: '1', name: 'Scott', surname: 'Crooks'},
    {id: '2', name: 'Rudolf', surname: 'Pralins'},
    {id: '3', name: 'Saeed', surname: 'Hashimi'},
    {id: '4', name: 'Andrey', surname: 'Kolybelnikov'}]

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <header className="App-header">
                <Main />
            </header>
        </div>
    )
}

export default App
