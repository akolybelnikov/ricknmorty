import styles from "./item.module.css"
import {Character} from "../interfaces/Character";
import React, {useState} from "react";

const Item: React.FC<Character> = ({name, species, image, episode}: Character) => {
    const [info, setInfo] = useState(false)

    const expand = () => setInfo(info => !info)

    return (
        <div className={styles.row}>
            <div>
                <img src={image} alt="character_image"/>
                <p className={styles.name}><span>{name}</span>, <span>{species}</span></p>
                <p className={styles.more}
                   onClick={() => expand()}>{`${!info ? 'More info >>' : 'Less info <<'}`}
                </p>
            </div>

            <article className={`${info ? styles.expanded : ''}`}>
                <p>Episode name: <span>{episode[0].name}</span></p>
                <p>Aired: <span>{episode[0].air_date}</span></p>
                <p>Episode number: <span>{episode[0].episode}</span></p>
                <p>Appeared in: <span>{episode.length}</span> episode(s)</p>
            </article>
        </div>
    )
}

export default Item