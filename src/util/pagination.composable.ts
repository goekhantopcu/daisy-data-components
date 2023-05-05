export interface PaginationResult<T> {
    data: T[];
    currentPage: number;
    totalItems: number;
    totalAbsoluteItems: number;
    totalPages: number;
}

export function paginate<T>(items: any[], pageSize: number): PaginationResult<T>[] {
    if (pageSize >= items.length || pageSize < 0) {
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
