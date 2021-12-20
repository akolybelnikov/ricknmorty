import './App.css'
import React, {ChangeEvent, useState} from "react";
import SearchBar from "./components/SearchBar";
import Paginator from "./components/Paginator";
import {useQuery, UseQueryResponse} from "urql";
import {Character} from "./interfaces/Character";
import Item from "./components/Item";
import GenericList from "./components/GenericList";
import {Info} from "./interfaces/Info";

const RicknMortyQuery = `
    query ($page: Int!, $name: String!) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
          next
          prev
          pages
        }
        results {
          id
          name
          species
          episode {
            name
            air_date
            episode
          }
          id
          image
          status
          type
          origin {
            name
          }
          location {
            name
          }
        }
      }
    }
`

function App() {
    const [page, setPage] = useState<number | string>(1)
    const [input, setInput] = useState("")
    const [name, setName] = useState("")
    const [pageSize, setPageSize] = useState(5)
    const [[start, end], setFrame] = useState([0, pageSize])

    const [{data, fetching, error}]: UseQueryResponse = useQuery({
        query: RicknMortyQuery,
        variables: {page, name}
    })

    const characters = data?.characters
    const errorMessage = error?.message

    const info: Info = characters?.info

    // const prevPageFromUrl: string = info?.prev?.split("page=")[1].split("&")[0]
    // const nextPageFromUrl: string = info?.next?.split("page=")[1].split("&")[0]
    //
    // const prevPage = prevPageFromUrl != "" ? parseInt(prevPageFromUrl) : null
    // const nextPage = nextPageFromUrl != "" ? parseInt(nextPageFromUrl) : null

    const prevPage = info?.prev
    const nextPage = info?.next

    const setSearch = (term: string) => setInput(term)

    const search = () => setName(input)

    const onKeyUp = (e: { charCode: number }) => {
        if (e.charCode == 13) search()
    }
    const goToPrev = () => {
        if (start - pageSize >= 0) {
            setFrame(([s, e]) => [s - pageSize, e - pageSize])
        } else {
            if (prevPage != null) {
                setPage(prevPage)
                if (!fetching && !error) {
                    setFrame(() => [20 - pageSize, 20])
                }
            }
        }
    }

    const goToNext = () => {
        if (end + pageSize <= 20) {
            setFrame(([s, e]) => [s + pageSize, e + pageSize])
        } else {
            if (nextPage != null) {
                setPage(() => nextPage)
            }
            if (!fetching && !error) {
                setFrame(() => [0, pageSize])
            }
        }

    }

    const onPageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(parseInt(e.target.value))
        setFrame(() => [0, parseInt(e.target.value)])
    }

    return (
        <div className="App">
            <header className="App-header">
                <SearchBar onKeyUp={onKeyUp} input={input} setSearch={setSearch} search={search}/>
            </header>
            <main>
                {fetching && <p>Loading...</p>}
                {characters && <GenericList
                    keyExtractor={({id}) => `${id}`}
                    renderItem={(item: Character) => <Item {...item} />}
                    data={characters?.results.slice(start, end)}/>}
                {error && <div>
                    <p>{errorMessage}</p>
                    <button onClick={() => setName("")}>Go back</button>
                </div>}
            </main>
            <footer>
                <Paginator next={nextPage != null} prev={start > 0 || prevPage != null}
                           goToPrev={goToPrev}
                           goToNext={goToNext} onChange={onPageSizeChange}/>
            </footer>
        </div>
    )
}

export default App
