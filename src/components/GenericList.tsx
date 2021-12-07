import {Props} from "../interfaces/Props";

const GenericList = <T extends any>({
                                        data,
                                        renderItem
                                    }: Props<T>) => {
    return (
        <div>
            {data.map((item, idx) => (
                <div key={idx} className={'item'}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    )
}

export default GenericList