export function getPagination(
    page: string | undefined,
    limit = 50
): { offset: number; limit: number } {
    const p = parseInt(page || '1');
    const offset = (p - 1) * limit;
    return { offset, limit };
}
