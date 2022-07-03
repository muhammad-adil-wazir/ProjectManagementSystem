export type DataTableRequest = {
    start: number;
    length: number;
    order: Order;
    filter: any;
};
export type DataTableResponse = {
    totalRecords: number;
    //filteredRecords: number;
    data: any[];
    status: string;
}
export type Order = {
    orderBy: string;
    orderDirection: "asc" | "desc" | undefined;
}
export type Column = {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
    visible: boolean;
    searchAble: boolean;
}