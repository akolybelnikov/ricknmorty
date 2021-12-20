import React, {ChangeEvent} from "react";
import {SBProps} from "../interfaces/SBProps";

const SearchBar: React.FC<SBProps> = ({onKeyUp, input, setSearch, search}) => {
    return (
        <p className={'search-bar'} role={'toolbar'}>
            <input onKeyPress={onKeyUp} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                   placeholder={'Search by name'}
                   value={input}/>
            <button className={'search'} type={"button"} onClick={() => search()}>Search</button>
        </p>
    )
}

export default SearchBar