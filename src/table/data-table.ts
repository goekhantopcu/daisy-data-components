export interface DataTableColumn<T> {
    slot: string;
    title: string;
    sortable: boolean;
    searchable: boolean;
    queryPredicate: (data: T) => string;
}

export interface DataTableOptions<T> {
    enableSearch: boolean;
    searchQuery?: string;
    minSearchQueryLength?: number;
    enablePagination: boolean;
    pageSize?: number;
    pageCurrentId?: number;
    loading: boolean;
    showLoadingBody?: boolean;
    showNoDataBody?: boolean;
    columns: DataTableColumn<T>[]
    items: T[]
}

// Search
export const search = (options: DataTableOptions<any>): any[] => {
    if (!options.enableSearch) {
        return options.items
    }
    const searchQuery = options.searchQuery
    const minSearchQueryLength = options.minSearchQueryLength ?? -1
    if (!searchQuery || searchQuery.trim().length === 0 || searchQuery.trim().length < minSearchQueryLength) {
        return options.items
    }
    const columns = options.columns.filter(column => column.searchable)
    if (columns.length === 0) {
        return options.items
    }
    return options.items.filter((item: any) => {
        return columns.some(column => wildcardIncludes(column.queryPredicate(item), searchQuery))
    });
}

// Sort
const sortCache = new Map<string, boolean>()
export const sort = (items: any[], column: DataTableColumn<any>): any[] => {
    if (!column.sortable) {
        return items
    }
    const ascending = !(sortCache.get(column.slot) ?? false)
    const sortedItems = items.sort((a: any, b: any) => {
        const resultA = column.queryPredicate(a)
        const resultB = column.queryPredicate(b)
        if (ascending) {
            return resultA.localeCompare(resultB)
        }
        return resultB.localeCompare(resultA)
    })
    sortCache.set(column.slot, ascending)
    return sortedItems
}

// Pagination
export interface PaginationResult<T> {
    data: T[];
    currentPage: number;
    totalItems: number;
    totalAbsoluteItems: number;
    totalPages: number;
}

export const paginate = <T>(items: any[], options: DataTableOptions<T>): PaginationResult<T>[] => {
    if (!options.enablePagination) {
        return [
            {
                data: options.items,
                currentPage: 0,
                totalItems: options.items.length,
                totalAbsoluteItems: options.items.length,
                totalPages: 1
            }
        ]
    }
    let {pageSize} = options;
    if (!pageSize || pageSize > items.length || pageSize < 0) {
        pageSize = items.length
    }
    const totalPages = Math.ceil(items.length / pageSize);
    const result: PaginationResult<T>[] = [];
    for (let i = 1; i <= totalPages; i++) {
        const startIndex = (i - 1) * pageSize;
        const endIndex = i * pageSize;
        const paginatedData = items.slice(startIndex, endIndex);
        const paginationResult: PaginationResult<T> = {
            data: paginatedData,
            currentPage: i - 1,
            totalItems: paginatedData.length,
            totalAbsoluteItems: items.length,
            totalPages: totalPages
        };
        result.push(paginationResult);
    }
    return result;
}

// Utility-Functions
const wildcardIncludes = (base: string, searchQuery: string) => {
    base = base.toLowerCase()
    searchQuery = searchQuery.toLowerCase()
    if (searchQuery === '') {
        return true
    }
    if (searchQuery.startsWith('%') && searchQuery.endsWith('%')) {
        const withoutWildcard = searchQuery.slice(1).slice(0, -1)
        return base.includes(withoutWildcard)
    }
    if (searchQuery.startsWith('%')) {
        const withoutWildcard = searchQuery.slice(1);
        return base.endsWith(withoutWildcard);
    }
    if (searchQuery.endsWith('%')) {
        const withoutWildcard = searchQuery.slice(0, -1);
        return base.startsWith(withoutWildcard);
    }
    return base.includes(searchQuery);
}

