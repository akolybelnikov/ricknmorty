import "./Item.css"
import {Character} from "../interfaces/Character";
import React, {useState} from "react";

const Item: React.FC<Character> = ({name, species, image, episode}: Character) => {
    const [info, setInfo] = useState(false)

    const expand = () => setInfo(info => !info)

    return (
        <div className={'row'}>
            <div>
                <img src={image} alt="character_image"/>
                <p className={'name'}><span>{name}</span>, <span>{species}</span></p>
                <p className={'more'}
                   onClick={() => expand()}>{`${!info ? 'More info >>' : 'Less info <<'}`}
                </p>
            </div>

            <article className={`${info ? 'expanded' : ''}`}>
                <p>Episode name: <span>{episode[0].name}</span></p>
                <p>Aired: <span>{episode[0].air_date}</span></p>
                <p>Episode number: <span>{episode[0].episode}</span></p>
                <p>Appeared in: <span>{episode.length}</span> episode(s)</p>
            </article>
        </div>
    )
}

export default Item