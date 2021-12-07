import {Props} from "../interfaces/Props";
import {useState} from "react";

const GenericList = <T extends unknown>({
                                        data,
                                        renderItem,
                                        max
                                    }: Props<T>) => {
    const [[min, currMax], setRange] = useState([0, max])

    console.log(data)

    /*
    * The slice() method returns a shallow copy of a portion of an array.
    * The original array will not be modified.
    */
    let cp = data.slice(min, currMax)

    const prev = () => {
        if (min > 0) {
            setRange(([a, b]) => [a - max, b - max])
            cp = data.slice(min, currMax)
        }
    }

    const next = () => {
        if (currMax < data.length) {
            setRange(([a, b]) => [a + max, b + max])
            cp = data.slice(min, currMax)
        }
    }

    return (
        <div>
            {cp.map((item, idx) => (
                <div key={idx} className={'item'}>
                    {renderItem(item)}
                </div>
            ))}
            <p>
                <button disabled={min <= 0} type="button" onClick={() => prev()}>
                    prev
                </button>
                <button disabled={currMax >= data.length} type="button" onClick={() => next()}>
                    next
                </button>
            </p>
        </div>
    )
}

export default GenericList