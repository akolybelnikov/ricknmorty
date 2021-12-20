import "./Item.css"
import {Character} from "../interfaces/Character";
import React, {useState} from "react";

const Item: React.FC<Character> = ({name, species, image, episode, status, origin, location}: Character) => {
    const [info, setInfo] = useState(false)

    const expand = () => setInfo(info => !info)

    return (
        <article className={'row'}>
            <img src={image} alt="character_image"/>
            <div className={'base-info'}>
                <h4 className={'name'}>{name}</h4>
                <p><span className={`${status == 'Dead' ? 'dead' : 'alive'}`}>{status}</span> - <span className={'species'}>{species}</span></p>
                <p className={'origin'}>Origin: {origin.name}</p>
                <p className={'location'}>Location: {location.name}</p>
            </div>

            <p className={'more'}
               onClick={() => expand()}>{`>`}
            </p>

            <div className={`${info ? 'expanded' : 'collapsed'}`}>
                <p>First appeared in: <span>{episode[0].episode}</span></p>
                <p>Aired on: <span>{episode[0].air_date}</span></p>
                <p>Episode name: <span>{episode[0].name}</span></p>
                <p>Appeared in: <span>{episode.length}</span> episode(s)</p>
            </div>
        </article>
    )
}

export default Item