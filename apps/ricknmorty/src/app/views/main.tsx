import styles from "./main.module.css"
import {useQuery} from "urql"
import GenericList from "../components/genericList";
import Item from "../components/item";
import {Character} from "../interfaces/Character";
import {useState} from "react";

const RicknMortyQuery = `
    query ($page: Int!, $name: String!) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
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
        }
      }
    }
`

export const Main = () => {
    const [page, setPage] = useState(1)
    const [name, setName] = useState("")
    const [input, setInput] = useState("")
    const [result, reexecuteQuery] = useQuery({
        query: RicknMortyQuery,
        variables: {page, name}
    })

    const next = () => setPage(page => page + 1)
    const prev = () => {
        if (page > 1) setPage(page => page - 1)
    }

    const {data, fetching, error} = result

    if (fetching) return <p>Loading...</p>
    if (error) return <div>
        <p>{error.message}</p>
        <button onClick={() => setName("")}>Go back</button>
    </div>

    const setSearch = (term: string) => setInput(term)
    const search = () => setName(input)
    const onKeyUp = (e: { charCode: number }) => {
        if (e.charCode == 13) search()
    }

    return (
        <>
            <p className={styles.searchbar}>
                <input onKeyPress={onKeyUp} onChange={(e) => setSearch(e.target.value)} placeholder={'Search by name'}
                       value={input}/>
                <button className={styles.search} type={"button"} onClick={() => search()}>Search</button>
            </p>
            <GenericList
                keyExtractor={(item: Character): string => `${item.id}`}
                renderItem={(item: Character) => <Item {...item} />}
                data={data.characters.results} max={5}/>
        </>
    )
}