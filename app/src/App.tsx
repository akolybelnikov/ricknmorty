import './App.css'
import {Main} from "./views/Main";
import {useState} from "react";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

function App() {
    const [input, setInput] = useState("")
    const [name, setName] = useState("")

    const setSearch = (term: string) => setInput(term)

    const search = () => setName(input)

    const onKeyUp = (e: { charCode: number }) => {
        if (e.charCode == 13) search()
    }
    const prev = () => {

    }

    const next = () => {

    }


    return (
        <div className="App">
            <header className="App-header">
                <SearchBar onKeyUp={onKeyUp} input={input} setSearch={setSearch} search={search}/>
            </header>
            <main>
                <Main name={name} setName={setName}/>
            </main>
            <footer>
                <Footer next={next} prev={prev}/>
            </footer>
        </div>
    )
}

export default App
