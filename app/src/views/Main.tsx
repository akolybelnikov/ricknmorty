import {useQuery} from "urql"
import GenericList from "../components/GenericList";
import Item from "../components/Item";
import {Character} from "../interfaces/Character";
import React, {useState} from "react";

import "./Main.css"
import {MainProps} from "../interfaces/MainProps";

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

export const Main: React.FC<MainProps> = ({name, setName}) => {
    const [page, setPage] = useState(1)

    const [result] = useQuery({
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

    return (
        <GenericList
            keyExtractor={({id}) => `${id}`}
            renderItem={(item: Character) => <Item {...item} />}
            data={data.characters.results} max={5}/>
    )
}