import {ChangeEvent} from "react";

export interface PaginatorProps {
    next: boolean;
    prev: boolean;
    goToNext: () => void;
    goToPrev: () => void;
    onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
}