import React from "react";

export interface ListComponentProps<T> {
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
    data: T[];
}