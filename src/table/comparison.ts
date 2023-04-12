const comparison = (a: any, b: any): number => {
    let compareResult: number | undefined;
    if (a === b) {
        compareResult = 0
    } else if (typeof a === 'string' && typeof b === 'string') {
        compareResult = a.localeCompare(b)
    } else if (a instanceof Date && b instanceof Date) {
        compareResult = a.getTime() - b.getTime()
    } else if (typeof a === 'number' && typeof b === 'number') {
        compareResult = a - b
    } else if (typeof a === 'boolean' && typeof b === 'boolean') {
        compareResult = a === b ? 0 : a ? 1 : -1
    } else if (a === null && b === null) {
        compareResult = 0
    } else if (a === null) {
        compareResult = -1
    } else if (b === null) {
        compareResult = 1
    } else if (a === undefined && b === undefined) {
        compareResult = 0
    } else if (a === undefined) {
        compareResult = -1
    } else if (b === undefined) {
        compareResult = 1
    } else if (Array.isArray(a) && Array.isArray(b)) {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            compareResult = comparison(a[i], b[i])
            if (compareResult !== 0) {
                break
            }
        }
        if (compareResult === 0) {
            compareResult = a.length - b.length
        }
    } else {
        compareResult = String(a).localeCompare(String(b))
    }
    return compareResult ?? 0
}

export { comparison }
