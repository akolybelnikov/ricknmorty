import {useQuery} from "urql"
import GenericList from "../components/GenericList";
import Item from "../components/Item";
import {Character} from "../interfaces/Character";

const RicknMortyQuery = `
    query {
      characters(page: 2, filter: { name: "rick" }) {
        info {
          count
        }
        results {
          name
          species
          location {
            dimension
            name
          }
          id
          image
        }
      }
      character(id: 1) {
        id
      }
    }
`

export const Main = () => {
    const [result, reexecuteQuery] = useQuery({query: RicknMortyQuery})

    const {data, fetching, error} = result

    if (fetching) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <GenericList renderItem={(item: Character) => <Item {...item} />} data={data.characters.results} max={5}/>
    )
}