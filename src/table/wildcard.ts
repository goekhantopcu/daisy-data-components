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

export { wildcardIncludes }
