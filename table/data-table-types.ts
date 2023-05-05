interface DataTableColumn<T> {
    slot: string;
    title: string;
    sortable?: boolean;
    searchable?: boolean;
    queryPredicate?: (data: T) => string | number | Date | boolean | undefined | null;
    classes?: string;
}

interface DataTableStyling {
    wrapper?: string;
    table?: string;
    head?: string;
    bodyLoading?: string;
    bodyNoData?: string;
    body?: string;
    foot?: string;
}

interface DataTableOptions<T> {
    enableSearch: boolean;
    searchQuery?: string;
    minSearchQueryLength?: number;
    enablePagination: boolean;
    pageSize?: number;
    pageCurrentId?: number;
    loading: boolean;
    styling?: DataTableStyling
    columns: DataTableColumn<T>[]
    items: T[]
}

export type { DataTableColumn, DataTableStyling, DataTableOptions }
