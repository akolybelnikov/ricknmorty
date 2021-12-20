import React from "react";
import {PaginatorProps} from "../interfaces/PaginatorProps";

const Paginator: React.FC<PaginatorProps> = ({next, prev, onChange, goToPrev, goToNext}: PaginatorProps) => {
    return (
        <p>
            <button disabled={!prev} type="button" onClick={goToPrev}>
                {'<'}
            </button>
            <select defaultValue={5} onChange={onChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
            <button disabled={!next} type="button" onClick={goToNext}>
                {">"}
            </button>
        </p>
    )
}

export default Paginator