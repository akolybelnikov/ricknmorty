export interface SBProps {
    onKeyUp: (e: { charCode: number }) => void;
    input: string;
    setSearch: (term: string) => void;
    search: () => void;
}