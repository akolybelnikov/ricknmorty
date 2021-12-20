import {ListComponentProps} from "../interfaces/ListComponentProps";

const GenericList = <T extends unknown>({
                                            data,
                                            renderItem,
                                            keyExtractor
                                        }: ListComponentProps<T>) => {
    /*
    * The slice() method returns a shallow copy of a portion of an array.
    * The original array will not be modified.
    */
    return (
        <div>
            {data.map((item) => (
                <div key={keyExtractor(item)} className={'item'}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    )
}

export default GenericList