import React, {ChangeEvent} from "react";
import {SearchBarProps} from "../interfaces/SearchBarProps";

const SearchBar: React.FC<SearchBarProps> = ({onKeyUp, input, setSearch, search}: SearchBarProps) => {
    return (
        <p className={'search-bar'} role={'toolbar'}>
            <input onKeyPress={onKeyUp} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                   placeholder={'Search characters by name'}
                   value={input}/>
            <button className={'search'} type={"button"} onClick={() => search()}>Search</button>
        </p>
    )
}

export default SearchBar