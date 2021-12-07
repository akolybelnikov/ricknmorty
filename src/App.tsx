import {useState} from 'react'
import logo from './logo.svg'
import './App.css'
import GenericList from "./components/GenericList";
import Item from "./components/Item"

let data = [{id: '1', name: 'Scott', surname: 'Crooks'},
    {id: '2', name: 'Rudolf', surname: 'Pralins'},
    {id: '3', name: 'Saeed', surname: 'Hashimi'},
    {id: '4', name: 'Andrey', surname: 'Kolybelnikov'}]

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                {/*<p>*/}
                {/*    <button type="button" onClick={() => setCount((count) => count + 1)}>*/}
                {/*        count is: {count}*/}
                {/*    </button>*/}
                {/*</p>*/}
            </header>
            <GenericList renderItem={(item) => <Item {...item} />} data={data}/>
        </div>
    )
}

export default App
