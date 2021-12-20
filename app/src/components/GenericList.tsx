import {GLCProps} from "../interfaces/GLCProps";
import {useState} from "react";

const GenericList = <T extends unknown>({
                                            data,
                                            renderItem,
                                            keyExtractor,
                                            max
                                        }: GLCProps<T>) => {
    const [[min, currMax], setRange] = useState([0, max])

    // const prev = () => {
    //     if (min > 0) {
    //         setRange(([a, b]) => [a - max, b - max])
    //         cp = data.slice(min, currMax)
    //     }
    // }
    //
    // const next = () => {
    //     if (currMax < data.length) {
    //         setRange(([a, b]) => [a + max, b + max])
    //         cp = data.slice(min, currMax)
    //     }
    // }

    /*
    * The slice() method returns a shallow copy of a portion of an array.
    * The original array will not be modified.
    */
    let cp = data.slice(min, currMax)

    return (
        <div>
            {cp.map((item) => (
                <div key={keyExtractor(item)} className={'item'}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    )
}

export default GenericList