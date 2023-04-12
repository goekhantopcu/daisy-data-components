import {wildcardIncludes} from "./wildcard";
import {comparison} from "./comparison";
import {paginate, PaginationResult} from "./pagination";
import {DataTableColumn, DataTableOptions} from "./types";

export const tableSearch = (options: DataTableOptions<any>): any[] => {
    if (!options.enableSearch) {
        return options.items
    }
    const searchQuery = options.searchQuery
    const minSearchQueryLength = options.minSearchQueryLength ?? -1
    if (!searchQuery || searchQuery.trim().length === 0 || searchQuery.trim().length < minSearchQueryLength) {
        return options.items
    }
    const columns = options.columns
        .filter(column => column.searchable)
        .filter(column => column.queryPredicate !== undefined)
    if (columns.length === 0) {
        return options.items
    }
    return options.items.filter((item: any) => {
        return columns.some(column => {
            const query = column.queryPredicate!(item)
            if (!query) {
                return false
            }
            return wildcardIncludes(query.toString(), searchQuery)
        })
    });
}

const tableSortCache = new Map<string, boolean>()
export const tableSort = (items: any[], column: DataTableColumn<any>): any[] => {
    if (!column.sortable || column.queryPredicate === undefined) {
        return items
    }
    const ascending = !(tableSortCache.get(column.slot) ?? false)
    const sortedItems = items.sort((a: any, b: any) => {
        if (ascending) {
            return comparison(column.queryPredicate!(a), column.queryPredicate!(b))
        }
        return comparison(column.queryPredicate!(b), column.queryPredicate!(a))
    })
    tableSortCache.set(column.slot, ascending)
    return sortedItems
}

export const tablePagination = <T>(items: any[], options: DataTableOptions<T>): PaginationResult<T>[] => {
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
    return paginate(items, options.pageSize ?? -1)
}
