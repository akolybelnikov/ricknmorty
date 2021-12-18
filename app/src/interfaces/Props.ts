import React from "react";

export interface Props<T> {
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
    data: T[];
    max: number;
}