import React from "react";
import {FooterProps} from "../interfaces/FooterProps";

const Footer: React.FC<FooterProps> = ({next, prev}) => {
    return (
        <p>
            <button disabled={false} type="button" onClick={prev}>
                prev
            </button>
            <button disabled={false} type="button" onClick={next}>
                next
            </button>
        </p>
    )
}

export default Footer