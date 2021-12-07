import {Character} from "../interfaces/Character";
import React from "react";

const Item: React.FC<Character> = ({name, species, location, image}: Character) => {
    return (
        <>
            <img src={image} alt="character_image"/>
            <p><span>{name}</span>, <span>{species}</span>, <span>{location.name}, {location.dimension}</span></p>
        </>
    )
}

export default Item