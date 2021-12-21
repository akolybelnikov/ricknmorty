import './App.css'
import React, {ChangeEvent, useState} from "react";
import SearchBar from "./components/SearchBar";
import Paginator from "./components/Paginator";
import {useQuery, UseQueryResponse} from "urql";
import {Character} from "./interfaces/Character";
import Item from "./components/Item";
import GenericList from "./components/GenericList";

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
    const [page, setPage] = useState<number | null>(1)
    const [input, setInput] = useState("")
    const [name, setName] = useState("")
    const [pageSize, setPageSize] = useState(5)
    const [[start, end], setFrame] = useState([0, pageSize])

    const [{data, fetching, error}]: UseQueryResponse = useQuery({
        query: RicknMortyQuery,
        variables: {page, name}
    })

    const setSearch = (term: string) => setInput(term)

    const search = () => setName(input)

    const onKeyUp = (e: { charCode: number }) => {
        if (e.charCode == 13) search()
    }
    const goToPrev = () => {
        if (start - pageSize >= 0) {
            setFrame(([s, e]) => [s - pageSize, e - pageSize])
        } else {
            if (data.characters.info?.prev != "") {
                const prevSeg = data.characters.info.prev.split("page=")[1].split("&")[0]
                const prevPage = parseInt(prevSeg)
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
            if (data.characters.info?.next != "") {
                const nextSeg = data.characters.info.next.split("page=")[1].split("&")[0]
                const nextPage = parseInt(nextSeg)
                setPage(() => nextPage)
                if (!fetching && !error) {
                    setFrame(() => [0, pageSize])
                }
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
                {data && <GenericList
                    keyExtractor={({id}) => `${id}`}
                    renderItem={(item: Character) => <Item {...item} />}
                    data={data?.characters?.results.slice(start, end)}/>}
                {error && <div>
                    <p>{error?.message}</p>
                    <button onClick={() => setName("")}>Go back</button>
                </div>}
            </main>
            <footer>
                <Paginator next={data?.characters?.info?.next != ""}
                           prev={start > 0 || data?.characters?.info?.prev != ""}
                           goToPrev={goToPrev}
                           goToNext={goToNext} onChange={onPageSizeChange}/>
            </footer>
        </div>
    )
}

export default App
